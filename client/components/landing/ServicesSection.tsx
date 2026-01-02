import { useEffect, useMemo, useRef, useState } from "react";
import type { ServicioItem } from "@/types/contentful";

type ServicesSectionProps = {
  id?: string;
  serviciosTitulo?: string;
  serviciosSubtitulo?: string;
  serviciosCss?: string;
  listaServicios?: ServicioItem[];
};

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 18,
        height: 18,
        position: "relative",
        display: "inline-block",
        transform: open ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 220ms ease",
        flex: "0 0 auto",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: "rgb(57, 68, 43)",
          transform: "translateY(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: "rgb(57, 68, 43)",
          transform: "translateX(-50%)",
        }}
      />
    </span>
  );
}

function AccordionItem({
  item,
  open,
  onToggle,
  withTopBorder,
}: {
  item: ServicioItem;
  open: boolean;
  onToggle: () => void;
  withTopBorder: boolean;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    if (open) {
      setMaxHeight(el.scrollHeight);
      return;
    }

    setMaxHeight(0);
  }, [open, item.contenido]);

  return (
    <div
      style={{
        borderTop: withTopBorder ? "1px solid rgb(57, 68, 43)" : undefined,
        borderBottom: "1px solid rgb(57, 68, 43)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          paddingTop: 22,
          paddingBottom: 22,
          paddingLeft: 0,
          paddingRight: 0,
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          cursor: "pointer",
          textAlign: "left",
          color: "rgb(57, 68, 43)",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "0.01em",
          }}
        >
          {item.titulo}
        </span>

        <PlusIcon open={open} />
      </button>

      <div
        style={{
          maxHeight,
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transition: "max-height 260ms ease, opacity 220ms ease",
        }}
      >
        <div
          ref={innerRef}
          style={{
            paddingBottom: 22,
            color: "rgb(57, 68, 43)",
            fontSize: 16,
            lineHeight: 1.55,
            whiteSpace: "pre-line",
          }}
        >
          {item.contenido}
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection({
  id,
  serviciosTitulo,
  serviciosSubtitulo,
  serviciosCss,
  listaServicios,
}: ServicesSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = serviciosTitulo || "Servicios";
  const subtitle = serviciosSubtitulo;

  const items = useMemo(
    () => (listaServicios || []).filter((item) => item.titulo),
    [listaServicios],
  );

  return (
    <section id={id} aria-label="Servicios">
      {serviciosCss ? <style>{serviciosCss}</style> : null}

      <div
        id="serviciosContainer"
        style={{
          backgroundColor: "rgb(253, 251, 247)",
          paddingTop: 96,
          paddingBottom: 96,
        }}
      >
        <div className="container px-4" style={{ maxWidth: 1240 }}>
          <div className="row gx-5 gy-5 align-items-start">
            <div className="col-12 col-lg-5 text-start">
              <div className="servicesTitleSticky" style={{ maxWidth: 520 }}>
                <div
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", Times, serif',
                    fontSize: "clamp(3rem, 4.6vw, 4rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    color: "rgb(57, 68, 43)",
                  }}
                >
                  {title}
                </div>

                {subtitle ? (
                  <div
                    style={{
                      marginTop: 22,
                      color: "rgb(57, 68, 43)",
                      fontSize: 16,
                      lineHeight: 1.45,
                      maxWidth: 420,
                    }}
                  >
                    {subtitle}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div style={{ width: "100%" }}>
                {items.map((item, index) => (
                  <AccordionItem
                    key={`${item.titulo}-${index}`}
                    item={item}
                    open={openIndex === index}
                    onToggle={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                    withTopBorder={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @media (min-width: 992px) {
              #serviciosContainer .servicesTitleSticky {
                position: sticky;
                top: 20px;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
