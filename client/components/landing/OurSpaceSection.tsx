import { useEffect, useMemo, useRef, useState } from "react";
import type { OurSpaceSlide } from "@/types/contentful";

type OurSpaceSectionProps = {
  id?: string;
  espacioSubtitulo?: string;
  espacioTitulo?: string;
  espacioLinkTexto?: string;
  espacioLinkUrl?: string;
  espacioCss?: string;
  espacioSlides?: OurSpaceSlide[];
};

function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5 12H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 7L18 12L13 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeft({ size = 18 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
      <ArrowRight size={size} />
    </span>
  );
}

function SectionLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        color: "#fff",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.02em",
        transition: "opacity 180ms ease, transform 180ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.85";
        e.currentTarget.style.transform = "translateX(2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
        e.currentTarget.style.transform = "translateX(0px)";
      }}
    >
      {children} <ArrowRight />
    </a>
  );
}

function SlideCard({ slide }: { slide: OurSpaceSlide }) {
  const href = slide.enlace || "#";

  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        scrollSnapAlign: "start",
      }}
      className="our-space-slide"
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "3 / 2",
            borderRadius: 14,
            overflow: "hidden",
            backgroundColor: "rgba(0,0,0,0.12)",
          }}
        >
          {slide.imagenUrl ? (
            <img
              src={slide.imagenUrl}
              alt={slide.imagenAlt || slide.titulo}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 18,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 300,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              lineHeight: 1.15,
            }}
          >
            {slide.titulo}
          </div>

          <span
            className="our-space-slide-arrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(0,0,0,0.8)",
              opacity: 0.65,
              transform: "translateX(0px)",
              transition: "opacity 180ms ease, transform 180ms ease",
              flex: "0 0 auto",
            }}
            aria-hidden="true"
          >
            <ArrowRight size={20} />
          </span>
        </div>
      </div>
    </a>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      disabled={false}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      style={{
        width: 44,
        height: 44,
        borderRadius: 9999,
        border: "1px solid white",
        background: "transparent",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "default" : "pointer",
        transition: "opacity 160ms ease",
      }}
    >
      {direction === "prev" ? (
        <ArrowLeft size={18} />
      ) : (
        <ArrowRight size={18} />
      )}
    </button>
  );
}

export default function OurSpaceSection({
  id,
  espacioSubtitulo,
  espacioTitulo,
  espacioLinkTexto,
  espacioLinkUrl,
  espacioCss,
  espacioSlides,
}: OurSpaceSectionProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const subtitle = (espacioSubtitulo || "OUR SOLUTIONS").toUpperCase();
  const title = (espacioTitulo || "OUR SPACE").toUpperCase();
  const linkText = espacioLinkTexto || "Explore our space";
  const linkUrl = espacioLinkUrl || "#";

  const slides = useMemo(
    () => (espacioSlides || []).filter((slide) => slide.titulo),
    [espacioSlides],
  );

  const updateNavState = () => {
    const el = trackRef.current;
    if (!el) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;

    setCanPrev(maxScrollLeft > 1 && left > 1);
    setCanNext(maxScrollLeft > 1 && left < maxScrollLeft - 1);
  };

  const getScrollStepPx = () => {
    const el = trackRef.current;
    if (!el) return 0;

    const first = el.querySelector<HTMLElement>(".our-space-item");
    if (!first) return Math.max(320, Math.round(el.clientWidth * 0.85));

    const styles = window.getComputedStyle(el);
    const gapValue = styles.columnGap || styles.gap;
    const gap = gapValue ? Number.parseFloat(gapValue) : 0;

    return Math.max(0, first.offsetWidth + (Number.isFinite(gap) ? gap : 0));
  };

  const slidePrev = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: -getScrollStepPx(), behavior: "smooth" });
  };

  const slideNext = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: getScrollStepPx(), behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    updateNavState();

    if (!el) return;

    const onScroll = () => updateNavState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateNavState();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section id={id} aria-label="Our Space">
      {espacioCss ? <style>{espacioCss}</style> : null}

      {/* Header (black container) */}
      <div
        id="espacioContainerTexts"
        style={{
          position: "relative",
          backgroundColor: "rgb(28, 28, 28)",
          paddingTop: 120,
          paddingBottom: 120,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.9,
              marginBottom: 18,
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              fontSize: "clamp(34px, 4.5vw, 56px)",
              fontWeight: 300,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              lineHeight: 1.05,
              marginBottom: 26,
            }}
          >
            {title}
          </div>

          <SectionLink href={linkUrl}>{linkText}</SectionLink>
        </div>

        {/* Custom navigation arrows (bottom-right, inside black container) */}
        <div
          aria-label="Carousel navigation"
          style={{
            position: "absolute",
            right: 24,
            bottom: 18,
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <NavButton direction="prev" disabled={!canPrev} onClick={slidePrev} />
          <NavButton direction="next" disabled={!canNext} onClick={slideNext} />
        </div>
      </div>

      {/* Carousel (gray container) */}
      <div
        id="espacioContainerSlide"
        style={{
          backgroundColor: "rgb(226, 220, 213)",
          paddingTop: 72,
          paddingBottom: 88,
        }}
      >
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div
            ref={trackRef}
            className="our-space-track"
            style={{
              display: "flex",
              gap: 22,
              paddingLeft: 24,
              paddingRight: 24,
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: 24,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {slides.map((slide, idx) => (
              <div
                key={`${slide.titulo}-${idx}`}
                className="our-space-item"
                style={{ flex: "0 0 88%" }}
              >
                <SlideCard slide={slide} />
              </div>
            ))}
          </div>

          {/* Hover animation + responsive slide widths + scrollbar hiding */}
          <style>{`
            .our-space-track {
              scrollbar-width: none;
            }
            .our-space-track::-webkit-scrollbar {
              display: none;
            }
            .our-space-slide:hover .our-space-slide-arrow {
              opacity: 1;
              transform: translateX(4px);
            }

            @media (min-width: 640px) {
              .our-space-item { flex-basis: 65% !important; }
            }
            @media (min-width: 900px) {
              .our-space-item { flex-basis: 46% !important; }
            }
            @media (min-width: 1200px) {
              /* ~2.5 slides visible */
              .our-space-item { flex-basis: calc(40% - 10px) !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
