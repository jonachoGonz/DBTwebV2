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
    error,
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
            <strong>No se pudo cargar el contenido desde Contentful.</strong> Mostrando contenido
            de ejemplo.
            {error && (
              <pre style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap", fontSize: "0.75rem" }}>
                {String(error)}
              </pre>
            )}
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
