import { Link } from "react-router-dom";

type HeroSectionProps = {
  id?: string;
  heroBackgroundImageUrl?: string;
  heroBackgroundImageAlt?: string;
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
  return (
    /^https?:\/\//i.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function HeroLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (href.startsWith("/#") || href.startsWith("#")) {
    const to = href.startsWith("/#") ? href : `/${href}`;
    return (
      <Link to={to} className={className} style={style}>
        {children}
      </Link>
    );
  }

  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}

export default function HeroSection({
  id,
  heroBackgroundImageUrl,
  heroBackgroundImageAlt,
  heroTitleMain,
  heroSubtitle,
  heroDescription,
  heroCtaText,
  heroCtaLink,
  heroSecondaryCtaText,
  heroSecondaryCtaLink,
  customCss,
}: HeroSectionProps) {
  const primaryHref = heroCtaLink || "https://wa.me/56949897699";
  const secondaryText = heroSecondaryCtaText || "Conoce el Programa DBT";
  const secondaryHref = heroSecondaryCtaLink || "/#servicios";

  return (
    <div
      style={{
        backgroundColor: "rgb(252, 248, 241)",
        display: "flex",
        flexDirection: "column",
        height: 928,
        maxHeight: 928,
        maxWidth: 1800,
        minHeight: 600,
        padding: 15,
        position: "relative",
        zIndex: 99,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {customCss ? <style>{customCss}</style> : null}

      <div
        style={{
          borderRadius: 20,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          paddingBottom: 64,
          position: "relative",
          backgroundColor: "transparent",
        }}
        aria-label="Hero"
      >
        {heroBackgroundImageUrl ? (
          <img
            alt={heroBackgroundImageAlt || "Terapia DBT Salud"}
            loading="lazy"
            src={heroBackgroundImageUrl}
            style={{
              borderRadius: 20,
              bottom: 0,
              height: "100%",
              left: 0,
              maxWidth: "100%",
              objectFit: "cover",
              position: "absolute",
              right: 0,
              top: 0,
              width: "100%",
              zIndex: -20,
            }}
          />
        ) : null}

        {/* Dark overlay to match warm/dark atmosphere */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: -10,
          }}
        />

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 1152,
            paddingLeft: 24,
            paddingRight: 24,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: "clamp(48px, 6vw, 60px)",
              fontWeight: 700,
              lineHeight: "60px",
              marginBottom: 20,
              textAlign: "center",
              whiteSpace: "pre-line",
            }}
          >
            {heroTitleMain}
          </h1>

          <div
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: 30,
              fontWeight: 300,
              lineHeight: "36px",
              marginBottom: 80,
              textAlign: "center",
              whiteSpace: "pre-line",
            }}
          >
            {heroSubtitle}
          </div>

          <div
            style={{
              color: "rgb(255, 255, 255)",
              fontSize: 24,
              fontWeight: 100,
              lineHeight: "32px",
              marginBottom: 32,
              textAlign: "center",
              whiteSpace: "pre-line",
            }}
          >
            {heroDescription}
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <HeroLink
              href={primaryHref}
              style={{
                alignItems: "center",
                backgroundColor: "rgb(252, 248, 241)",
                borderRadius: 9999,
                color: "rgb(0, 0, 0)",
                cursor: "pointer",
                display: "flex",
                fontSize: 18,
                fontWeight: 500,
                justifyContent: "center",
                lineHeight: "28px",
                padding: "16px 32px",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {heroCtaText}
            </HeroLink>

            <HeroLink
              href={secondaryHref}
              style={{
                alignItems: "center",
                border: "2px solid rgb(252, 248, 241)",
                borderRadius: 9999,
                color: "rgb(252, 248, 241)",
                cursor: "pointer",
                display: "flex",
                fontSize: 18,
                fontWeight: 500,
                justifyContent: "center",
                lineHeight: "28px",
                padding: "16px 32px",
                textAlign: "center",
                textDecoration: "none",
                backgroundColor: "transparent",
              }}
            >
              {secondaryText}
            </HeroLink>
          </div>
        </div>
      </div>
    </div>
  );
}
