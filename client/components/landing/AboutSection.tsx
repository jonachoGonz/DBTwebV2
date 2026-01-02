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

      <div id="somosContainer">
        <div className="somosGrid">
          <div className="somosImageWrap">
            {somosImagenUrl ? (
              <img
                src={somosImagenUrl}
                alt={somosImagenAlt || ""}
                className="somosImage"
                loading="lazy"
              />
            ) : (
              <div className="somosImagePlaceholder" aria-hidden="true" />
            )}
          </div>

          <div className="somosContent">
            {somosSubtitulo ? (
              <div className="somosSubtitle">{somosSubtitulo}</div>
            ) : null}

            <h2 className="somosTitle">{title}</h2>

            {somosContenido ? (
              <p className="somosBody">{somosContenido}</p>
            ) : null}
          </div>
        </div>
      </div>

      <style>{`
        #somosContainer {
          background: linear-gradient(90deg, #ffffff 0%, #ebe6d9 100%);
        }

        #somosContainer .somosGrid {
          display: grid;
          grid-template-columns: 1fr;
        }

        #somosContainer .somosImageWrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.04);
        }

        #somosContainer .somosImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        #somosContainer .somosImagePlaceholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f4f1e7, #ebe6d9);
        }

        #somosContainer .somosContent {
          padding: 56px 24px;
          text-align: left;
          color: rgb(57, 68, 43);
        }

        #somosContainer .somosSubtitle {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        #somosContainer .somosTitle {
          margin: 18px 0 0;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: clamp(2.25rem, 4.2vw, 3.75rem);
          line-height: 0.98;
          letter-spacing: -0.02em;
        }

        #somosContainer .somosBody {
          margin: 22px 0 0;
          max-width: 52ch;
          font-size: 16px;
          line-height: 1.6;
          white-space: pre-line;
        }

        @media (min-width: 992px) {
          #somosContainer .somosGrid {
            grid-template-columns: 54% 46%;
            min-height: 640px;
          }

          #somosContainer .somosImageWrap {
            aspect-ratio: auto;
            height: 100%;
          }

          #somosContainer .somosContent {
            padding: 160px 85px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          #somosContainer .somosBody {
            font-size: 17px;
          }
        }

        @media (min-width: 1200px) {
          #somosContainer .somosGrid {
            min-height: 700px;
          }
        }
      `}</style>
    </section>
  );
}
