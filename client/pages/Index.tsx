import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import BookingSection from "@/components/landing/BookingSection";
import { fallbackLandingContent } from "@/content/fallbackLandingContent";
import { useContentfulData } from "@/hooks/useContentfulData";

export default function Index() {
  const {
    data = fallbackLandingContent,
    isLoading,
    isError,
  } = useContentfulData();

  return (
    <div>
      {isLoading ? (
        <div className="container pt-3">
          <div
            className="alert alert-light border d-flex align-items-center gap-2"
            role="status"
          >
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            />
            <span className="text-secondary small">
              Cargando contenido desde Contentful…
            </span>
          </div>
        </div>
      ) : null}

      {isError ? (
        <div className="container pt-3">
          <div className="alert alert-warning border" role="alert">
            No se pudo cargar el contenido desde Contentful. Mostrando contenido
            de ejemplo.
          </div>
        </div>
      ) : null}

      <HeroSection
        id="top"
        heroTitulo={data.heroTitulo}
        heroSubtitulo={data.heroSubtitulo}
        ctaTexto={data.ctaTexto}
      />

      <ServicesSection id="services" services={data.services} />

      <BookingSection
        id="booking"
        bookingTitulo={data.bookingTitulo}
        bookingUrl={data.bookingUrl}
      />
    </div>
  );
}
