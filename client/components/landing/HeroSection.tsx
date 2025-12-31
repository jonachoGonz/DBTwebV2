import { Link } from "react-router-dom";

type HeroSectionProps = {
  id?: string;
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
};

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function HeroLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  if (href.startsWith("/#") || href.startsWith("#")) {
    return (
      <Link to={href.startsWith("/#") ? href : `/${href}`} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}

export default function HeroSection({
  id,
  heroBackgroundImageUrl,
  heroBackgroundImageAlt,
  heroLogoUrl,
  heroLogoAlt,
  heroTitleMain,
  heroSubtitle,
  heroDescription,
  heroCtaText,
  heroCtaLink,
  heroSecondaryCtaText,
  heroSecondaryCtaLink,
  customCss,
}: HeroSectionProps) {
  const showPrimaryCta = Boolean(heroCtaLink && heroCtaText);
  const showSecondaryCta = Boolean(heroSecondaryCtaLink && heroSecondaryCtaText);

  return (
    <section
      id={id}
      className="position-relative w-100 overflow-hidden"
      style={{
        minHeight: 800,
        height: "100vh",
        borderRadius: 20,
        backgroundColor: "rgb(252, 248, 241)",
        backgroundImage: heroBackgroundImageUrl
          ? `url(${heroBackgroundImageUrl})`
          : "radial-gradient(1200px 600px at 10% 20%, rgba(24, 123, 112, 0.15), transparent 60%), radial-gradient(1000px 600px at 90% 10%, rgba(30, 58, 138, 0.12), transparent 55%), linear-gradient(180deg, #ffffff, rgba(241, 249, 248, 0.7))",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Hero"
    >
      {customCss ? <style>{customCss}</style> : null}

      {/* Background image accessibility (keeps design while providing alt text) */}
      {heroBackgroundImageUrl ? (
        <img
          src={heroBackgroundImageUrl}
          alt={heroBackgroundImageAlt || ""}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -20,
          }}
          loading="lazy"
        />
      ) : null}

      {/* Dark overlay for readability */}
      <div
        aria-hidden="true"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: -10 }}
      />

      <div className="container h-100">
        <div className="row h-100 align-items-end align-items-lg-center justify-content-center text-center">
          <div className="col-12 col-lg-10 col-xl-8 pb-5 pb-lg-0">
            {heroLogoUrl ? (
              <div className="mb-4">
                <img
                  src={heroLogoUrl}
                  alt={heroLogoAlt || "Logo"}
                  style={{
                    maxWidth: 220,
                    width: "100%",
                    height: "auto",
                    filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.35))",
                  }}
                  loading="lazy"
                />
              </div>
            ) : null}

            <h1
              className="fw-bold text-white mb-3"
              style={{
                fontSize: "clamp(2.25rem, 4vw, 3.75rem)",
                lineHeight: 1.05,
                textShadow: "0 2px 16px rgba(0,0,0,0.35)",
              }}
            >
              {heroTitleMain}
            </h1>

            <div
              className="text-white mb-3"
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.875rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                textShadow: "0 1px 12px rgba(0,0,0,0.35)",
              }}
            >
              {heroSubtitle}
            </div>

            {heroDescription ? (
              <p
                className="text-white mb-4"
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  fontWeight: 100,
                  lineHeight: 1.4,
                  opacity: 0.95,
                  textShadow: "0 1px 12px rgba(0,0,0,0.35)",
                }}
              >
                {heroDescription}
              </p>
            ) : null}

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              {showPrimaryCta ? (
                <HeroLink
                  href={heroCtaLink as string}
                  className="btn btn-light btn-lg px-4 py-3 rounded-pill"
                  ariaLabel={heroCtaText}
                >
                  {heroCtaText}
                </HeroLink>
              ) : null}

              {showSecondaryCta ? (
                <HeroLink
                  href={heroSecondaryCtaLink as string}
                  className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill"
                  ariaLabel={heroSecondaryCtaText}
                >
                  {heroSecondaryCtaText}
                </HeroLink>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
