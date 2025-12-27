import type { PaginaInicioContent } from "@/types/contentful";

type BookingSectionProps = {
  id?: string;
  bookingTitulo: PaginaInicioContent["bookingTitulo"];
  bookingUrl?: PaginaInicioContent["bookingUrl"];
};

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export default function BookingSection({
  id,
  bookingTitulo,
  bookingUrl,
}: BookingSectionProps) {
  const canEmbed = Boolean(bookingUrl && isSafeUrl(bookingUrl));

  return (
    <section id={id} className="py-5" style={{ backgroundColor: "#f6fbfa" }}>
      <div className="container py-lg-4">
        <div className="row align-items-end g-3 mb-4">
          <div className="col-12 col-lg-7">
            <h2 className="h1 fw-bold mb-2">{bookingTitulo}</h2>
            <p className="text-secondary mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elige un
              horario y confirma tu reserva.
            </p>
          </div>
          <div className="col-12 col-lg-5 text-lg-end">
            <div className="text-secondary small">
              Si no encuentras disponibilidad, contáctanos para alternativas.
            </div>
          </div>
        </div>

        {canEmbed ? (
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-body p-0">
              <div className="ratio ratio-4x3">
                <iframe
                  src={bookingUrl}
                  title="Booking widget"
                  loading="lazy"
                  style={{ border: 0 }}
                  allow="camera; microphone; fullscreen"
                />
              </div>
            </div>
            <div className="card-footer bg-white border-0 p-4">
              <div className="text-secondary small">
                Nota: este widget es un ejemplo. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-7">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-lg-5">
                  <h3 className="h5 fw-semibold">Agenda en 3 pasos</h3>
                  <ol className="text-secondary mt-3 mb-0">
                    <li>Elige un horario disponible.</li>
                    <li>Confirma tus datos de contacto.</li>
                    <li>Recibe un email con los detalles de la sesión.</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-lg-5">
                  <h3 className="h5 fw-semibold">Widget no configurado</h3>
                  <p className="text-secondary mt-3 mb-4">
                    Aún no se ha definido <strong>bookingUrl</strong> en el CMS.
                    Mientras tanto, mostramos este bloque de contenido.
                  </p>

                  <div className="p-3 rounded-3 border bg-light">
                    <div className="fw-semibold">Horario de ejemplo</div>
                    <div className="text-secondary small mt-1">
                      Lun–Vie • 9:00–18:00 • Online y presencial
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
