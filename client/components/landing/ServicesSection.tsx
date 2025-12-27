import { HeartHandshake, Sparkles, Users } from "lucide-react";
import type { LandingService } from "@/types/contentful";

type ServicesSectionProps = {
  id?: string;
  services: LandingService[];
};

function FallbackIcon({ index }: { index: number }) {
  const Icon =
    index % 3 === 0 ? HeartHandshake : index % 3 === 1 ? Users : Sparkles;

  return (
    <span
      className="d-inline-flex align-items-center justify-content-center rounded-3"
      style={{
        width: 44,
        height: 44,
        backgroundColor: "rgba(24, 123, 112, 0.12)",
        color: "rgb(var(--bs-primary-rgb))",
      }}
      aria-hidden="true"
    >
      <Icon size={22} />
    </span>
  );
}

function ServiceIcon({
  service,
  index,
}: {
  service: LandingService;
  index: number;
}) {
  if (!service.iconoUrl) return <FallbackIcon index={index} />;

  return (
    <span
      className="d-inline-flex align-items-center justify-content-center rounded-3"
      style={{
        width: 44,
        height: 44,
        backgroundColor: "rgba(24, 123, 112, 0.12)",
        overflow: "hidden",
      }}
    >
      <img
        src={service.iconoUrl}
        alt={service.iconoAlt || service.titulo}
        style={{ width: 26, height: 26, objectFit: "contain" }}
      />
    </span>
  );
}

export default function ServicesSection({
  id,
  services,
}: ServicesSectionProps) {
  return (
    <section id={id} className="py-5 bg-white">
      <div className="container py-lg-4">
        <div className="row align-items-end g-3 mb-4">
          <div className="col-12 col-lg-7">
            <h2 className="h1 fw-bold mb-2">Servicios</h2>
            <p className="text-secondary mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elige el
              formato que mejor se adapte a tu proceso.
            </p>
          </div>
          <div className="col-12 col-lg-5 text-lg-end">
            <div className="text-secondary small">
              Atención personalizada • Enfoque basado en evidencia
            </div>
          </div>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={`${service.titulo}-${index}`}
            >
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <ServiceIcon service={service} index={index} />
                    <div>
                      <h3 className="h5 fw-semibold mb-1">{service.titulo}</h3>
                      <div className="text-secondary small">
                        Lorem ipsum • dolor sit amet
                      </div>
                    </div>
                  </div>

                  <p className="text-secondary mb-0">{service.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
