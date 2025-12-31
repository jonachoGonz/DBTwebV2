import type { LandingContent } from "@/types/contentful";

export const fallbackLandingContent: LandingContent = {
  heroBackgroundImageUrl: undefined,
  heroBackgroundImageAlt: undefined,
  heroLogoUrl: undefined,
  heroLogoAlt: undefined,

  heroTitleMain:
    "No necesitas tenerlo todo claro. A veces, solo hace falta tomar el primer paso.",
  heroSubtitle: "Acompañamos procesos terapéuticos con calidez, evidencia y humanidad.",
  heroDescription:
    "Atención psicológica online y presencial, en español e inglés, desde Chile.",

  heroCtaText: "Quiero comenzar terapia",
  heroCtaLink: "https://wa.me/56949897699",
  heroSecondaryCtaText: "Conoce el Programa DBT",
  heroSecondaryCtaLink: "/#services",

  customCss: undefined,

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
