export type LandingService = {
  titulo: string;
  descripcion: string;
  iconoUrl?: string;
  iconoAlt?: string;
};

export type OurSpaceSlide = {
  titulo: string;
  imagenUrl?: string;
  imagenAlt?: string;
  enlace?: string;
};

export type ServicioItem = {
  titulo: string;
  contenido?: string;
};

export type EquipoMiembro = {
  nombre: string;
  rol?: string;
  imagenUrl?: string;
  imagenAlt?: string;
  descripcion?: string;
  formacion?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  agendaUrl?: string;
};

export type PaginaInicioContent = {
  heroBackgroundImageUrl?: string;
  heroBackgroundImageAlt?: string;
  heroLogoUrl?: string;
  heroLogoAlt?: string;

  heroTitleMain: string;
  heroSubtitle: string;
  heroDescription?: string;

  heroCtaText: string;
  heroCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaLink?: string;

  customCss?: string;

  bookingTitulo: string;
  bookingUrl?: string;

  espacioSubtitulo?: string;
  espacioTitulo?: string;
  espacioLinkTexto?: string;
  espacioLinkUrl?: string;
  espacioCss?: string;
  espacioSlides?: OurSpaceSlide[];

  somosImagenUrl?: string;
  somosImagenAlt?: string;
  somosTitulo?: string;
  somosSubtitulo?: string;
  somosContenido?: string;
  somosCss?: string;

  serviciosTitulo?: string;
  serviciosSubtitulo?: string;
  serviciosCss?: string;
  listaServicios?: ServicioItem[];

  equipoTitulo?: string;
  equipoDescripcion?: string;
  equipoSubtitulo?: string;
  equipoCss?: string;
  listaEquipo?: EquipoMiembro[];
};

export type LandingContent = PaginaInicioContent;
