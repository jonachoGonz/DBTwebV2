import { useEffect, useMemo, useRef, useState } from "react";
import type { EquipoMiembro } from "@/types/contentful";

type TeamSectionProps = {
  id?: string;
  equipoTitulo?: string;
  equipoDescripcion?: string;
  equipoSubtitulo?: string;
  equipoCss?: string;
  listaEquipo?: EquipoMiembro[];
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
      aria-label={direction === "prev" ? "Previous" : "Next"}
      disabled={false}
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      style={{
        width: 44,
        height: 44,
        borderRadius: 9999,
        border: "1px solid rgba(57, 68, 43, 0.55)",
        background: "transparent",
        color: "rgb(57, 68, 43)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "default" : "pointer",
        transition: "opacity 160ms ease, transform 160ms ease",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
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

function LinkedInMark({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.4 23.5h4.2V7.9H.4v15.6ZM8.4 7.9h4v2.1h.1c.6-1.1 2.1-2.3 4.3-2.3 4.6 0 5.5 3 5.5 7v8.8h-4.2v-7.8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.2v7.9H8.4V7.9Z" />
    </svg>
  );
}

function InstagramMark({ size = 18 }: { size?: number }) {
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
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function TeamCard({
  member,
  onClick,
}: {
  member: EquipoMiembro;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="teamCard"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <div className="teamCardMedia">
        {member.imagenUrl ? (
          <img
            src={member.imagenUrl}
            alt={member.imagenAlt || member.nombre}
            loading="lazy"
            className="teamCardImage"
          />
        ) : (
          <div className="teamCardPlaceholder" aria-hidden="true" />
        )}

        {member.linkedinUrl ? (
          <span className="teamCardLinkedIn" aria-hidden="true">
            <LinkedInMark size={16} />
          </span>
        ) : null}
      </div>

      <div className="teamCardText">
        <div className="teamCardName">{member.nombre}</div>
        {member.rol ? <div className="teamCardRole">{member.rol}</div> : null}
      </div>
    </button>
  );
}

function TeamModal({
  member,
  onClose,
}: {
  member: EquipoMiembro;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const agendaHref = member.agendaUrl || "#contacto";

  return (
    <div
      className="teamModalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label={member.nombre}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="teamModalCard" role="document">
        <div className="teamModalCloseRow">
          <button
            ref={closeRef}
            type="button"
            className="teamModalClose"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-5">
            <div className="teamModalMedia">
              {member.imagenUrl ? (
                <img
                  src={member.imagenUrl}
                  alt={member.imagenAlt || member.nombre}
                  className="teamModalImage"
                  loading="lazy"
                />
              ) : (
                <div className="teamModalPlaceholder" aria-hidden="true" />
              )}
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="teamModalTitle">{member.nombre}</div>
            {member.rol ? (
              <div className="teamModalRole">{member.rol}</div>
            ) : null}

            {member.linkedinUrl || member.instagramUrl ? (
              <div className="teamModalSocial">
                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="teamModalIcon"
                    aria-label="LinkedIn"
                  >
                    <LinkedInMark size={18} />
                  </a>
                ) : null}

                {member.instagramUrl ? (
                  <a
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="teamModalIcon"
                    aria-label="Instagram"
                  >
                    <InstagramMark size={18} />
                  </a>
                ) : null}
              </div>
            ) : null}

            {member.descripcion ? (
              <div className="teamModalSection">
                <div className="teamModalSectionTitle">Bio</div>
                <div className="teamModalSectionBody">{member.descripcion}</div>
              </div>
            ) : null}

            {member.formacion ? (
              <div className="teamModalSection">
                <div className="teamModalSectionTitle">Formación</div>
                <div className="teamModalSectionBody">{member.formacion}</div>
              </div>
            ) : null}

            <a className="teamModalCta" href={agendaHref}>
              Agendar hora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection({
  id,
  equipoTitulo,
  equipoDescripcion,
  equipoSubtitulo,
  equipoCss,
  listaEquipo,
}: TeamSectionProps) {
  const members = useMemo(
    () => (listaEquipo || []).filter((m) => m.nombre),
    [listaEquipo],
  );

  const title = equipoTitulo || "Equipo";
  const subtitle = equipoSubtitulo;
  const description = equipoDescripcion;

  const [activeMember, setActiveMember] = useState<EquipoMiembro | null>(null);

  const shouldUseSlider = members.length >= 4;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

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

    const first = el.querySelector<HTMLElement>(".teamSlide");
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
    if (!shouldUseSlider) return;

    const el = trackRef.current;
    if (!el) return;

    updateNavState();

    const onScroll = () => updateNavState();
    const onResize = () => updateNavState();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUseSlider, members.length]);

  return (
    <section id={id} aria-label="Equipo">
      {equipoCss ? <style>{equipoCss}</style> : null}

      <div id="equipoContainer">
        <div className="container py-5">
          <div className="row gx-5 gy-5 align-items-start">
            <div className="col-12 col-lg-4">
              <div className="teamSticky">
                <h2 className="teamTitle">{title}</h2>

                {description ? (
                  <p className="teamDescription">{description}</p>
                ) : null}

                {subtitle ? <h3 className="teamSubtitle">{subtitle}</h3> : null}
              </div>
            </div>

            <div className="col-12 col-lg-8">
              {shouldUseSlider ? (
                <div>
                  <div
                    className="teamTrack"
                    ref={trackRef}
                    style={{
                      display: "flex",
                      gap: 22,
                      overflowX: "auto",
                      overflowY: "hidden",
                      scrollSnapType: "x mandatory",
                      scrollPaddingLeft: 12,
                      WebkitOverflowScrolling: "touch",
                      paddingBottom: 6,
                    }}
                  >
                    {members.map((member) => (
                      <div
                        key={member.nombre}
                        className="teamSlide"
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <TeamCard
                          member={member}
                          onClick={() => setActiveMember(member)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="teamNavRow">
                    <NavButton
                      direction="prev"
                      disabled={!canPrev}
                      onClick={slidePrev}
                    />
                    <NavButton
                      direction="next"
                      disabled={!canNext}
                      onClick={slideNext}
                    />
                  </div>
                </div>
              ) : (
                <div className="row g-4">
                  {members.map((member) => (
                    <div
                      key={member.nombre}
                      className={
                        members.length === 1
                          ? "col-12"
                          : members.length === 2
                            ? "col-12 col-md-6"
                            : "col-12 col-md-6 col-lg-4"
                      }
                    >
                      <TeamCard
                        member={member}
                        onClick={() => setActiveMember(member)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {activeMember ? (
        <TeamModal
          member={activeMember}
          onClose={() => setActiveMember(null)}
        />
      ) : null}

      <style>{`
        #equipoContainer {
          background-color: rgb(253, 251, 247);
        }

        #equipoContainer .teamTitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: clamp(2.2rem, 3.6vw, 3.2rem);
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: #39442b;
        }

        #equipoContainer .teamDescription {
          margin: 16px 0 0;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(57, 68, 43, 0.82);
          max-width: 44ch;
          white-space: pre-line;
        }

        #equipoContainer .teamSubtitle {
          margin: 26px 0 0;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 1.35rem;
          line-height: 1.2;
          color: #39442b;
          max-width: 30ch;
        }

        @media (min-width: 992px) {
          #equipoContainer .teamSticky {
            position: sticky;
            top: 20px;
          }
        }

        /* Card */
        #equipoContainer .teamCardMedia {
          position: relative;
          width: 100%;
          border-radius: 22px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.06);
          aspect-ratio: 3 / 4;
        }

        #equipoContainer .teamCardImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(100%);
          transform: scale(1);
          transition: filter 240ms ease, transform 240ms ease;
        }

        #equipoContainer .teamCard:hover .teamCardImage {
          filter: grayscale(0%);
          transform: scale(1.02);
        }

        #equipoContainer .teamCardPlaceholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f4f1e7, #ebe6d9);
        }

        #equipoContainer .teamCardLinkedIn {
          position: absolute;
          right: 14px;
          top: 14px;
          width: 34px;
          height: 34px;
          border-radius: 9999px;
          background: rgba(253, 251, 247, 0.88);
          color: rgba(57, 68, 43, 0.9);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
        }

        #equipoContainer .teamCardText {
          margin-top: 14px;
        }

        #equipoContainer .teamCardName {
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 1.25rem;
          line-height: 1.2;
          color: #39442b;
        }

        #equipoContainer .teamCardRole {
          margin-top: 6px;
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(57, 68, 43, 0.7);
        }

        /* Slider */
        #equipoContainer .teamTrack {
          scrollbar-width: none;
        }

        #equipoContainer .teamTrack::-webkit-scrollbar {
          display: none;
        }

        #equipoContainer .teamSlide {
          flex: 0 0 calc(83.33% - 2px); /* ~1.2 slides on mobile */
          max-width: calc(83.33% - 2px);
        }

        @media (min-width: 992px) {
          #equipoContainer .teamSlide {
            flex: 0 0 calc(40% - 2px); /* ~2.5 slides on desktop */
            max-width: calc(40% - 2px);
          }
        }

        #equipoContainer .teamNavRow {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 18px;
        }

        /* Modal */
        .teamModalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          z-index: 1050;
        }

        .teamModalCard {
          width: 100%;
          max-width: 980px;
          background: rgb(253, 251, 247);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
          max-height: calc(100vh - 36px);
          overflow: auto;
        }

        .teamModalCloseRow {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 8px;
        }

        .teamModalClose {
          border: 1px solid rgba(57, 68, 43, 0.35);
          background: transparent;
          color: rgba(57, 68, 43, 0.9);
          border-radius: 9999px;
          padding: 8px 14px;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
        }

        .teamModalMedia {
          border-radius: 18px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.06);
          aspect-ratio: 3 / 4;
        }

        .teamModalImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .teamModalPlaceholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f4f1e7, #ebe6d9);
        }

        .teamModalTitle {
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 2rem;
          line-height: 1.1;
          color: #39442b;
        }

        .teamModalRole {
          margin-top: 8px;
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(57, 68, 43, 0.7);
        }

        .teamModalSocial {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
        }

        .teamModalIcon {
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          border: 1px solid rgba(57, 68, 43, 0.35);
          color: rgba(57, 68, 43, 0.9);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: transform 160ms ease, opacity 160ms ease;
        }

        .teamModalIcon:hover {
          transform: translateY(-1px);
          opacity: 0.85;
        }

        .teamModalSection {
          margin-top: 18px;
        }

        .teamModalSectionTitle {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(57, 68, 43, 0.7);
          margin-bottom: 8px;
        }

        .teamModalSectionBody {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(57, 68, 43, 0.82);
          white-space: pre-line;
        }

        .teamModalCta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 22px;
          padding: 12px 16px;
          border-radius: 9999px;
          background: rgb(57, 68, 43);
          color: rgb(253, 251, 247);
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: transform 160ms ease, opacity 160ms ease;
        }

        .teamModalCta:hover {
          transform: translateY(-1px);
          opacity: 0.92;
        }
      `}</style>
    </section>
  );
}
