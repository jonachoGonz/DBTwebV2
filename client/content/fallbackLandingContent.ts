import type { LandingContent } from "@/types/contentful";

export const fallbackLandingContent: LandingContent = {
  heroTitulo: "DBT web v1 — Terapia basada en evidencia, con calma y claridad",
  heroSubtitulo:
    "Un espacio seguro para trabajar habilidades de regulación emocional, tolerancia al malestar y relaciones más sanas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ctaTexto: "Agendar primera sesión",
  bookingTitulo: "Reserva tu cita",
  bookingUrl: undefined,
  services: [
    {
      titulo: "Terapia DBT individual",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enfoque estructurado para construir habilidades y objetivos medibles.",
      iconoUrl: undefined,
      iconoAlt: undefined,
    },
    {
      titulo: "Entrenamiento de habilidades",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mindfulness, regulación emocional, efectividad interpersonal.",
      iconoUrl: undefined,
      iconoAlt: undefined,
    },
    {
      titulo: "Acompañamiento en crisis",
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Planes de seguridad, contención y herramientas prácticas.",
      iconoUrl: undefined,
      iconoAlt: undefined,
    },
  ],
};
