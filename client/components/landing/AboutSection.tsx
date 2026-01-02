import type { PaginaInicioContent } from "@/types/contentful";

type AboutSectionProps = {
  id?: string;
  somosImagenUrl?: PaginaInicioContent["somosImagenUrl"];
  somosImagenAlt?: PaginaInicioContent["somosImagenAlt"];
  somosTitulo?: PaginaInicioContent["somosTitulo"];
  somosSubtitulo?: PaginaInicioContent["somosSubtitulo"];
  somosContenido?: PaginaInicioContent["somosContenido"];
  somosCss?: PaginaInicioContent["somosCss"];
};

export default function AboutSection({
  id,
  somosImagenUrl,
  somosImagenAlt,
  somosTitulo,
  somosSubtitulo,
  somosContenido,
  somosCss,
}: AboutSectionProps) {
  const title = somosTitulo || "Sobre nosotros";

  return (
    <section id={id} aria-label="Sobre nosotros">
      {somosCss ? <style>{somosCss}</style> : null}

      <div id="somosContainer" className="py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              {somosImagenUrl ? (
                <img
                  src={somosImagenUrl}
                  alt={somosImagenAlt || ""}
                  className="img-fluid somosImage"
                  loading="lazy"
                />
              ) : (
                <div className="somosImagePlaceholder" aria-hidden="true" />
              )}
            </div>

            <div className="col-12 col-lg-6 mt-4 mt-lg-0">
              {somosSubtitulo ? (
                <div className="somosEyebrow">{somosSubtitulo}</div>
              ) : null}

              <h2 className="somosTitle">{title}</h2>

              {somosContenido ? (
                <p className="somosBody">{somosContenido}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #somosContainer {
          background-color: rgb(253, 251, 247);
        }

        #somosContainer .somosImage {
          border-radius: 30px;
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        #somosContainer .somosImagePlaceholder {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 30px;
          background: linear-gradient(135deg, #f4f1e7, #ebe6d9);
        }

        #somosContainer .somosEyebrow {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(57, 68, 43, 0.72);
          margin-bottom: 12px;
        }

        #somosContainer .somosTitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: clamp(2.25rem, 4vw, 3.5rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #39442b;
        }

        #somosContainer .somosBody {
          margin: 18px 0 0;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(57, 68, 43, 0.82);
          max-width: 60ch;
          white-space: pre-line;
        }

        @media (min-width: 992px) {
          #somosContainer .somosBody {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}
