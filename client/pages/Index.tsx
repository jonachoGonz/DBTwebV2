import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import ServicesSection from "@/components/landing/ServicesSection";
import BookingSection from "@/components/landing/BookingSection";
import OurSpaceSection from "@/components/landing/OurSpaceSection";
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
            <strong>No se pudo cargar el contenido desde Contentful.</strong>{" "}
            Mostrando contenido de ejemplo.
          </div>
        </div>
      ) : null}

      <HeroSection
        id="inicio"
        heroBackgroundImageUrl={data.heroBackgroundImageUrl}
        heroBackgroundImageAlt={data.heroBackgroundImageAlt}
        heroTitleMain={data.heroTitleMain}
        heroSubtitle={data.heroSubtitle}
        heroDescription={data.heroDescription}
        heroCtaText={data.heroCtaText}
        heroCtaLink={data.heroCtaLink}
        heroSecondaryCtaText={data.heroSecondaryCtaText}
        heroSecondaryCtaLink={data.heroSecondaryCtaLink}
        customCss={data.customCss}
      />

      <AboutSection
        id="somos"
        somosImagenUrl={data.somosImagenUrl}
        somosImagenAlt={data.somosImagenAlt}
        somosTitulo={data.somosTitulo}
        somosSubtitulo={data.somosSubtitulo}
        somosContenido={data.somosContenido}
        somosCss={data.somosCss}
      />

      <ServicesSection
        id="servicios"
        serviciosTitulo={data.serviciosTitulo}
        serviciosSubtitulo={data.serviciosSubtitulo}
        serviciosCss={data.serviciosCss}
        listaServicios={data.listaServicios}
      />

      <OurSpaceSection
        id="espacio"
        espacioSubtitulo={data.espacioSubtitulo}
        espacioTitulo={data.espacioTitulo}
        espacioLinkTexto={data.espacioLinkTexto}
        espacioLinkUrl={data.espacioLinkUrl}
        espacioCss={data.espacioCss}
        espacioSlides={data.espacioSlides}
      />

      <BookingSection
        id="contacto"
        bookingTitulo={data.bookingTitulo}
        bookingUrl={data.bookingUrl}
      />
    </div>
  );
}
