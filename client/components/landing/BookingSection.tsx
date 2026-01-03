import { useEffect, useMemo, useState } from "react";
import { BookerEmbed } from "@calcom/atoms";
import type { EquipoMiembro, PaginaInicioContent } from "@/types/contentful";

type BookingSectionProps = {
  id?: string;
  bookingTitulo: PaginaInicioContent["bookingTitulo"];
  listaEquipo?: PaginaInicioContent["listaEquipo"];
};

type ParsedCalUrl = {
  username: string;
  eventSlug: string;
};

function parseCalUrl(url: string): ParsedCalUrl | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    if (!hostname.endsWith("cal.com")) return null;

    const segments = parsed.pathname
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean);

    if (segments.length < 2) return null;

    const username = segments[0];
    const eventSlug = segments[1];

    if (!username || !eventSlug) return null;

    return { username, eventSlug };
  } catch {
    return null;
  }
}

function formatMemberLabel(member: EquipoMiembro): string {
  return member.rol ? `${member.nombre} · ${member.rol}` : member.nombre;
}

export default function BookingSection({
  id,
  bookingTitulo,
  listaEquipo,
}: BookingSectionProps) {
  const members = useMemo(
    () => (listaEquipo || []).filter((m) => m.nombre),
    [listaEquipo],
  );

  const [selectedName, setSelectedName] = useState<string | null>(null);

  useEffect(() => {
    if (members.length === 0) {
      setSelectedName(null);
      return;
    }

    if (selectedName && members.some((m) => m.nombre === selectedName)) {
      return;
    }

    setSelectedName(members[0].nombre);
  }, [members, selectedName]);

  const selectedMember = useMemo(() => {
    if (members.length === 0) return null;
    if (!selectedName) return members[0];
    return members.find((m) => m.nombre === selectedName) ?? members[0];
  }, [members, selectedName]);

  const parsed = useMemo(() => {
    const url = selectedMember?.agendaUrl;
    return url ? parseCalUrl(url) : null;
  }, [selectedMember?.agendaUrl]);

  const showEmbed = Boolean(selectedMember && parsed);

  return (
    <section id={id} className="py-5" style={{ backgroundColor: "#fdfbf7" }}>
      <div className="container py-lg-4">
        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-12 col-lg-4">
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
                fontSize: "clamp(2rem, 3.6vw, 3rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#39442B",
                margin: 0,
              }}
            >
              {bookingTitulo}
            </h2>

            <p className="text-secondary mt-3" style={{ lineHeight: 1.6 }}>
              Elige un profesional y revisa la disponibilidad en el calendario.
            </p>

            {members.length > 0 ? (
              <div className="mt-4">
                <div
                  className="text-secondary"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Profesionales
                </div>

                <div className="list-group mt-2">
                  {members.map((member) => {
                    const active = member.nombre === selectedMember?.nombre;
                    return (
                      <button
                        key={member.nombre}
                        type="button"
                        className={`list-group-item list-group-item-action d-flex flex-column align-items-start gap-1 ${
                          active ? "active" : ""
                        }`}
                        onClick={() => setSelectedName(member.nombre)}
                        aria-pressed={active}
                        style={{
                          borderRadius: 14,
                          border: "1px solid rgba(57,68,43,0.18)",
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            fontFamily:
                              'Georgia, "Times New Roman", Times, serif',
                            fontSize: 18,
                            lineHeight: 1.2,
                          }}
                        >
                          {member.nombre}
                        </div>
                        {member.rol ? (
                          <div
                            style={{
                              fontSize: 12,
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              opacity: 0.85,
                            }}
                          >
                            {member.rol}
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {selectedMember?.agendaUrl && !parsed ? (
                  <div className="alert alert-light border mt-3" role="status">
                    <div className="fw-semibold">Scheduling unavailable</div>
                    <div className="text-secondary small mt-1">
                      La URL de Cal.com para “
                      {formatMemberLabel(selectedMember)}” no es válida (debe
                      incluir usuario y slug del evento).
                    </div>
                  </div>
                ) : null}

                {!selectedMember?.agendaUrl ? (
                  <div className="alert alert-light border mt-3" role="status">
                    <div className="fw-semibold">Scheduling unavailable</div>
                    <div className="text-secondary small mt-1">
                      Este profesional no tiene agenda configurada.
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="alert alert-light border mt-4" role="status">
                <div className="fw-semibold">Scheduling unavailable</div>
                <div className="text-secondary small mt-1">
                  No hay profesionales configurados en el CMS.
                </div>
              </div>
            )}
          </div>

          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm overflow-hidden">
              <div className="card-body p-0">
                <div style={{ minHeight: 640 }}>
                  {showEmbed && parsed ? (
                    <BookerEmbed
                      key={`${parsed.username}/${parsed.eventSlug}`}
                      username={parsed.username}
                      eventSlug={parsed.eventSlug}
                      view="MONTH_VIEW"
                      customClassNames={{
                        bookerContainer: "w-100 h-100 border-0",
                      }}
                      onCreateBookingSuccess={() =>
                        console.log("Booking confirmed")
                      }
                    />
                  ) : (
                    <div
                      className="d-flex flex-column align-items-center justify-content-center text-center p-4"
                      style={{ minHeight: 640 }}
                    >
                      <div
                        style={{
                          fontFamily:
                            'Georgia, "Times New Roman", Times, serif',
                          fontSize: 26,
                          color: "#39442B",
                        }}
                      >
                        Scheduling unavailable
                      </div>
                      <div
                        className="text-secondary mt-2"
                        style={{ maxWidth: 520 }}
                      >
                        Selecciona un profesional con una URL válida de Cal.com
                        (por ejemplo: https://cal.com/jon-doe/30min).
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showEmbed && selectedMember ? (
              <div className="text-secondary small mt-3">
                Mostrando disponibilidad para{" "}
                <strong>{selectedMember.nombre}</strong>.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
