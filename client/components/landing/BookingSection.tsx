import { useEffect, useMemo, useState } from "react";
import type { EquipoMiembro, PaginaInicioContent } from "@/types/contentful";

type BookingSectionProps = {
  id?: string;
  bookingTitulo: PaginaInicioContent["bookingTitulo"];
  listaEquipo?: PaginaInicioContent["listaEquipo"];
};

type Selection = {
  memberName: string;
  sessionIndex: number;
};

function formatMemberLabel(member: EquipoMiembro): string {
  return member.nombre;
}

function buildSrcDoc(embedCode: string): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { height: 100%; width: 100%; margin: 0; padding: 0; }
      body { overflow: hidden; }
      iframe { width: 100%; height: 100%; border: 0; display: block; }
    </style>
  </head>
  <body>
    ${embedCode}
  </body>
</html>`;
}

function findFirstAvailableSelection(members: EquipoMiembro[]): {
  selection: Selection;
  embedCode: string;
} | null {
  for (const member of members) {
    const sessions = member.sesionesDisponibles ?? [];
    for (let i = 0; i < sessions.length; i += 1) {
      const code = sessions[i]?.sesionEmbedCode?.trim();
      if (code) {
        return {
          selection: { memberName: member.nombre, sessionIndex: i },
          embedCode: code,
        };
      }
    }
  }

  return null;
}

export default function BookingSection({
  id,
  bookingTitulo,
  listaEquipo,
}: BookingSectionProps) {
  const members = useMemo(
    () => (listaEquipo || []).filter((m) => Boolean(m?.nombre)),
    [listaEquipo],
  );

  const [selection, setSelection] = useState<Selection | null>(null);
  const [selectedEmbedCode, setSelectedEmbedCode] = useState<string>("");

  useEffect(() => {
    if (members.length === 0) {
      setSelection(null);
      setSelectedEmbedCode("");
      return;
    }

    const currentMember = selection
      ? members.find((m) => m.nombre === selection.memberName)
      : null;

    const currentSession =
      currentMember?.sesionesDisponibles?.[selection?.sessionIndex ?? -1];

    if (currentMember && currentSession?.sesionEmbedCode) {
      const normalized = currentSession.sesionEmbedCode.trim();
      if (normalized && normalized !== selectedEmbedCode) {
        setSelectedEmbedCode(normalized);
      }
      return;
    }

    const first = findFirstAvailableSelection(members);
    if (first) {
      setSelection(first.selection);
      setSelectedEmbedCode(first.embedCode);
      return;
    }

    // If there are members but none has an embed code, still select the first
    // member so the UI shows the proper empty-state message.
    if (!selection) {
      setSelection({ memberName: members[0].nombre, sessionIndex: 0 });
    }
  }, [members, selection, selectedEmbedCode]);

  const selectedMember = useMemo(() => {
    if (members.length === 0) return null;
    if (selection?.memberName) {
      return (
        members.find((m) => m.nombre === selection.memberName) ?? members[0]
      );
    }
    return members[0];
  }, [members, selection?.memberName]);

  const selectedSession = useMemo(() => {
    if (!selectedMember) return null;
    const index = selection?.sessionIndex ?? 0;
    return selectedMember.sesionesDisponibles?.[index] ?? null;
  }, [selectedMember, selection?.sessionIndex]);

  const srcDoc = useMemo(() => {
    if (!selectedEmbedCode.trim()) return "";
    return buildSrcDoc(selectedEmbedCode);
  }, [selectedEmbedCode]);

  const showEmbed = Boolean(srcDoc);

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
              Selecciona un profesional y el tipo de sesión para ver
              disponibilidad.
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

                <div className="d-flex flex-column gap-3 mt-2">
                  {members.map((member) => {
                    const sessions = member.sesionesDisponibles ?? [];
                    const activeMember =
                      member.nombre === selectedMember?.nombre;

                    return (
                      <div
                        key={member.nombre}
                        style={{
                          borderRadius: 16,
                          border: activeMember
                            ? "1px solid rgba(57,68,43,0.5)"
                            : "1px solid rgba(57,68,43,0.18)",
                          background: "rgba(255,255,255,0.7)",
                          padding: 14,
                        }}
                      >
                        <div
                          style={{
                            fontFamily:
                              'Georgia, "Times New Roman", Times, serif',
                            fontSize: 18,
                            lineHeight: 1.2,
                            color: "#39442B",
                          }}
                        >
                          {member.nombre}
                        </div>

                        {sessions.length > 0 ? (
                          <div className="d-flex flex-wrap gap-2 mt-3">
                            {sessions.map((session, index) => {
                              const active =
                                selection?.memberName === member.nombre &&
                                selection?.sessionIndex === index;

                              const label = session.nombreSesion?.trim()
                                ? session.nombreSesion
                                : `Sesión ${index + 1}`;

                              return (
                                <button
                                  key={`${member.nombre}-${label}-${index}`}
                                  type="button"
                                  className="btn btn-sm"
                                  onClick={() => {
                                    setSelection({
                                      memberName: member.nombre,
                                      sessionIndex: index,
                                    });
                                    setSelectedEmbedCode(
                                      session.sesionEmbedCode?.trim() ?? "",
                                    );
                                  }}
                                  aria-pressed={active}
                                  style={{
                                    borderRadius: 999,
                                    border: active
                                      ? "1px solid #39442B"
                                      : "1px solid rgba(57,68,43,0.35)",
                                    background: active
                                      ? "#39442B"
                                      : "transparent",
                                    color: active ? "#ffffff" : "#39442B",
                                    fontWeight: active ? 600 : 500,
                                    padding: "6px 12px",
                                  }}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-secondary small mt-3">
                            Este profesional no tiene sesiones configuradas.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="alert alert-light border mt-4" role="status">
                <div className="fw-semibold">Agenda no disponible</div>
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
                  {showEmbed ? (
                    <iframe
                      key={`${selection?.memberName ?? ""}-${selection?.sessionIndex ?? 0}`}
                      title="Agenda"
                      srcDoc={srcDoc}
                      style={{ width: "100%", height: 640, border: 0 }}
                      loading="lazy"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
                      referrerPolicy="no-referrer-when-downgrade"
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
                        Agenda no disponible
                      </div>
                      <div
                        className="text-secondary mt-2"
                        style={{ maxWidth: 520 }}
                      >
                        Configura al menos una sesión con su código embed en el
                        CMS.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedMember ? (
              <div className="text-secondary small mt-3">
                {selectedSession?.nombreSesion ? (
                  <>
                    Mostrando disponibilidad para{" "}
                    <strong>{formatMemberLabel(selectedMember)}</strong> (
                    {selectedSession.nombreSesion}).
                  </>
                ) : (
                  <>
                    Mostrando disponibilidad para{" "}
                    <strong>{formatMemberLabel(selectedMember)}</strong>.
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
