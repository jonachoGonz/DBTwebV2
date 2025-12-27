export type LandingService = {
  titulo: string;
  descripcion: string;
  iconoUrl?: string;
  iconoAlt?: string;
};

export type PaginaInicioContent = {
  heroTitulo: string;
  heroSubtitulo: string;
  ctaTexto: string;
  bookingTitulo: string;
  bookingUrl?: string;
};

export type LandingContent = PaginaInicioContent & {
  services: LandingService[];
};
