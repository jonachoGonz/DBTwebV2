import {
  createClient,
  type Asset,
  type Entry,
  type EntrySkeletonType,
} from "contentful";
import type { LandingService, PaginaInicioContent } from "@/types/contentful";

type PaginaInicioFields = {
  heroBackgroundImage?: unknown;
  heroLogo?: unknown;

  heroTitleMain?: unknown;
  heroSubtitle?: unknown;
  heroDescription?: unknown;

  heroCtaText?: unknown;
  heroCtaLink?: unknown;

  heroSecondaryCtaText?: unknown;
  heroSecondaryCtaLink?: unknown;

  customCss?: unknown;

  bookingTitulo?: unknown;
  bookingUrl?: unknown;
};

type PaginaInicioSkeleton = EntrySkeletonType<
  PaginaInicioFields,
  "5Ey3sNNCbytnoyjC4OmlNy"
>;

type SeccionServicioFields = {
  titulo?: unknown;
  descripcion?: unknown;
  icono?: unknown;
};

type SeccionServicioSkeleton = EntrySkeletonType<
  SeccionServicioFields,
  "3dwLLZs9gGH5zEzwIoBebi"
>;

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

function readAssetUrl(asset: Asset | undefined): {
  url?: string;
  alt?: string;
} {
  const fileUrl = asset?.fields?.file && (asset.fields.file as any)?.url;
  const title = readString(asset?.fields?.title);

  if (!readString(fileUrl)) return { url: undefined, alt: title };

  const url: string = (fileUrl as string).startsWith("//")
    ? `https:${fileUrl}`
    : (fileUrl as string);

  return { url, alt: title };
}

export function hasContentfulConfig(): boolean {
  return Boolean(
    import.meta.env.VITE_CONTENTFUL_SPACE_ID &&
      import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
  );
}

export function getContentfulClient() {
  if (!hasContentfulConfig()) return null;

  return createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master",
  });
}

export function mapPaginaInicio(
  entry: Entry<PaginaInicioSkeleton>,
): PaginaInicioContent {
  const fields = entry.fields as any;

  const heroBackgroundAsset = (fields.heroBackgroundImage ||
    fields.heroBackgroundImagen ||
    fields.backgroundImage) as unknown as Asset | undefined;
  const heroLogoAsset = (fields.heroLogo || fields.logo) as unknown as
    | Asset
    | undefined;

  const background = readAssetUrl(heroBackgroundAsset);
  const logo = readAssetUrl(heroLogoAsset);

  const heroTitleMain =
    readString(fields.heroTitleMain || fields.heroTitulo || fields.heroTitle) ??
    "No necesitas tenerlo todo claro. A veces, solo hace falta tomar el primer paso.";

  const heroSubtitle =
    readString(fields.heroSubtitle || fields.heroSubtitulo) ??
    "Acompañamos procesos terapéuticos con calidez, evidencia y humanidad.";

  const heroDescription = readString(
    fields.heroDescription || fields.heroDescripcion,
  );

  const heroCtaText =
    readString(fields.heroCtaText || fields.ctaText || fields.ctaTexto) ??
    "Quiero comenzar terapia";

  const heroCtaLink = readString(
    fields.heroCtaLink ||
      fields.heroCtaUrl ||
      fields.heroCtaURL ||
      fields.ctaLink ||
      fields.ctaUrl ||
      fields.ctaURL,
  );

  const heroSecondaryCtaText = readString(
    fields.heroSecondaryCtaText || fields.heroCtaTextSecondary,
  );

  const heroSecondaryCtaLink = readString(
    fields.heroSecondaryCtaLink ||
      fields.heroCtaLinkSecondary ||
      fields.heroCtaUrlSecondary,
  );

  const customCss = readString(fields.customCss);

  return {
    heroBackgroundImageUrl: background.url,
    heroBackgroundImageAlt: background.alt,
    heroLogoUrl: logo.url,
    heroLogoAlt: logo.alt,

    heroTitleMain,
    heroSubtitle,
    heroDescription,

    heroCtaText,
    heroCtaLink,
    heroSecondaryCtaText,
    heroSecondaryCtaLink,

    customCss,

    bookingTitulo:
      readString(fields.bookingTitulo || fields.bookingTitle) ??
      "Reserva tu cita",
    bookingUrl: readString(fields.bookingUrl || fields.bookingURL),
  };
}

export function mapSeccionServicio(
  entry: Entry<SeccionServicioSkeleton>,
): LandingService {
  const fields = entry.fields as any;
  const iconAsset = (fields.icono || fields.icon) as unknown as
    | Asset
    | undefined;
  const { url, alt } = readAssetUrl(iconAsset);

  return {
    titulo: readString(fields.titulo || fields.title) ?? "Servicio",
    descripcion:
      readString(fields.descripcion || fields.description) ??
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    iconoUrl: url,
    iconoAlt: alt,
  };
}

export async function fetchPaginaInicio(): Promise<PaginaInicioContent | null> {
  const client = getContentfulClient();
  if (!client) {
    console.warn("[Contentful] No client configured - missing env vars");
    return null;
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Contentful API timeout")), 10000),
    );
    const response = (await Promise.race([
      client.getEntries<PaginaInicioSkeleton>({
        content_type: "5Ey3sNNCbytnoyjC4OmlNy",
        limit: 1,
        include: 2,
      }),
      timeoutPromise,
    ])) as any;

    const entry = response.items?.[0];
    return entry ? mapPaginaInicio(entry) : null;
  } catch (error) {
    console.error("[Contentful] Error fetching PaginaInicio:", error);
    throw error;
  }
}

export async function fetchSeccionServicios(): Promise<
  LandingService[] | null
> {
  const client = getContentfulClient();
  if (!client) {
    console.warn("[Contentful] No client configured - missing env vars");
    return null;
  }

  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Contentful API timeout")), 10000),
    );
    const response = (await Promise.race([
      client.getEntries<SeccionServicioSkeleton>({
        content_type: "3dwLLZs9gGH5zEzwIoBebi",
        include: 2,
      }),
      timeoutPromise,
    ])) as any;

    const items = (response.items ?? []) as Entry<SeccionServicioSkeleton>[];
    return items.map(mapSeccionServicio);
  } catch (error) {
    console.error("[Contentful] Error fetching SeccionServicio:", error);
    throw error;
  }
}
