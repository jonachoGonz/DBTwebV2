export type LandingService = {
  titulo: string;
  descripcion: string;
  iconoUrl?: string;
  iconoAlt?: string;
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
};

export type LandingContent = PaginaInicioContent & {
  services: LandingService[];
};
