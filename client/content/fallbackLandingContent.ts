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

  somosImagenUrl: undefined,
  somosImagenAlt: undefined,
  somosSubtitulo: "Nuestra misión",
  somosTitulo: "Your Care, Our Priority",
  somosContenido:
    "Acompañamos procesos terapéuticos con calidez, evidencia y humanidad. Nuestro enfoque combina herramientas DBT con un espacio seguro y cercano para que puedas avanzar a tu ritmo.",

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

  equipoTitulo: "Nuestro equipo",
  equipoDescripcion:
    "Un equipo clínico comprometido con una atención cálida, basada en evidencia y centrada en la persona.",
  equipoSubtitulo: "Formación y experiencia",
  equipoCss: undefined,
  listaEquipo: [
    {
      nombre: "Dra. Camila Rivera",
      rol: "Psicóloga Clínica",
      imagenUrl: undefined,
      imagenAlt: "",
      descripcion:
        "Especialista en DBT y terapia basada en mindfulness. Acompaña procesos de regulación emocional y habilidades interpersonales.",
      formacion: "Magíster en Psicología Clínica · Formación DBT",
      linkedinUrl: "https://www.linkedin.com",
      instagramUrl: "https://www.instagram.com",
      agendaUrl: "/#contacto",
    },
    {
      nombre: "Sebastián Morales",
      rol: "Terapeuta DBT",
      imagenUrl: undefined,
      imagenAlt: "",
      descripcion:
        "Enfoque práctico y colaborativo para trabajar en objetivos, hábitos y estrategias para el día a día.",
      formacion: "Diplomado en Terapias Contextuales · DBT Skills",
      linkedinUrl: "https://www.linkedin.com",
      agendaUrl: "/#contacto",
    },
    {
      nombre: "Valentina Rojas",
      rol: "Nutricionista",
      imagenUrl: undefined,
      imagenAlt: "",
      descripcion:
        "Acompañamiento nutricional integrativo, especialmente en procesos vinculados a TCA y bienestar.",
      formacion: "Nutrición Clínica · Especialización en TCA",
      instagramUrl: "https://www.instagram.com",
      agendaUrl: "/#contacto",
    },
    {
      nombre: "Martín Álvarez",
      rol: "Psiquiatra",
      imagenUrl: undefined,
      imagenAlt: "",
      descripcion:
        "Evaluación y acompañamiento médico con mirada integral y coordinación con el equipo terapéutico.",
      formacion: "Psiquiatría Adultos · Salud Mental Comunitaria",
      agendaUrl: "/#contacto",
    },
  ],
};
