import type { LandingContent } from "@/types/contentful";

export const fallbackLandingContent: LandingContent = {
  heroBackgroundImageUrl: undefined,
  heroBackgroundImageAlt: undefined,
  heroLogoUrl: undefined,
  heroLogoAlt: undefined,

  heroTitleMain:
    "No necesitas tenerlo todo claro. A veces, solo hace falta tomar el primer paso.",
  heroSubtitle:
    "Acompañamos procesos terapéuticos con calidez, evidencia y humanidad.",
  heroDescription:
    "Atención psicológica online y presencial, en español e inglés, desde Chile.",

  heroCtaText: "Quiero comenzar terapia",
  heroCtaLink: "https://wa.me/56949897699",
  heroSecondaryCtaText: "Conoce el Programa DBT",
  heroSecondaryCtaLink: "/#servicios",

  customCss: undefined,

  bookingTitulo: "Reserva tu cita",
  bookingUrl: undefined,

  espacioSubtitulo: "OUR SOLUTIONS",
  espacioTitulo: "OUR SPACE",
  espacioLinkTexto: "Explore our space",
  espacioLinkUrl: "/#contacto",
  espacioCss: undefined,
  espacioSlides: [
    {
      titulo: "Espacio terapéutico",
      imagenUrl: undefined,
      imagenAlt: "",
      enlace: "/#contacto",
    },
    {
      titulo: "Sesiones presenciales",
      imagenUrl: undefined,
      imagenAlt: "",
      enlace: "/#contacto",
    },
    {
      titulo: "Atención online",
      imagenUrl: undefined,
      imagenAlt: "",
      enlace: "/#contacto",
    },
  ],

  serviciosTitulo: "Servicios",
  serviciosSubtitulo: "Cómo te acompañamos en tu proceso",
  serviciosCss: undefined,
  listaServicios: [
    {
      titulo: "Terapia DBT individual",
      contenido:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enfoque estructurado para construir habilidades y objetivos medibles.",
    },
    {
      titulo: "Entrenamiento de habilidades",
      contenido:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mindfulness, regulación emocional, efectividad interpersonal.",
    },
    {
      titulo: "Acompañamiento en crisis",
      contenido:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Planes de seguridad, contención y herramientas prácticas.",
    },
  ],
};
