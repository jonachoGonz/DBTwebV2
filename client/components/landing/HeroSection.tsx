import { Link } from "react-router-dom";

type HeroSectionProps = {
  id?: string;
  heroTitulo: string;
  heroSubtitulo: string;
  ctaTexto: string;
};

export default function HeroSection({
  id,
  heroTitulo,
  heroSubtitulo,
  ctaTexto,
}: HeroSectionProps) {
  return (
    <section
      id={id}
      className="py-5"
      style={{
        background:
          "radial-gradient(1200px 600px at 10% 20%, rgba(24, 123, 112, 0.15), transparent 60%), radial-gradient(1000px 600px at 90% 10%, rgba(30, 58, 138, 0.12), transparent 55%), linear-gradient(180deg, #ffffff, rgba(241, 249, 248, 0.7))",
      }}
    >
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-7">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border bg-white shadow-sm">
              <span
                className="rounded-circle"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "rgb(var(--bs-primary-rgb))",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              <span className="small text-secondary">
                Psicoterapia • DBT • Salud mental
              </span>
            </div>

            <h1 className="display-5 fw-bold mt-4 mb-3">{heroTitulo}</h1>
            <p className="lead text-secondary mb-4" style={{ maxWidth: 640 }}>
              {heroSubtitulo}
            </p>

            <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3">
              <Link to="/#booking" className="btn btn-primary btn-lg">
                {ctaTexto}
              </Link>
              <Link to="/#services" className="btn btn-outline-secondary btn-lg">
                Ver servicios
              </Link>
            </div>

            <div className="mt-4 text-secondary small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <h2 className="h5 fw-semibold mb-3">¿Qué es DBT?</h2>
                <p className="text-secondary mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. DBT
                  se enfoca en habilidades prácticas para manejar emociones
                  intensas y mejorar relaciones.
                </p>

                <div className="row g-3">
                  <div className="col-12">
                    <div className="p-3 rounded-3 border bg-light">
                      <div className="fw-semibold">Mindfulness</div>
                      <div className="text-secondary small">
                        Presencia, claridad, y decisiones con intención.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 rounded-3 border bg-light">
                      <div className="fw-semibold">Regulación emocional</div>
                      <div className="text-secondary small">
                        Comprender patrones y responder con más equilibrio.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 rounded-3 border bg-light">
                      <div className="fw-semibold">Efectividad interpersonal</div>
                      <div className="text-secondary small">
                        Límites sanos, comunicación y autocuidado.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
