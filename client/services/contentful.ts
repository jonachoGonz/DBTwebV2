import {
  createClient,
  type Asset,
  type Entry,
  type EntrySkeletonType,
} from "contentful";
import type { LandingService, PaginaInicioContent } from "@/types/contentful";

type PaginaInicioFields = {
  heroTitulo?: unknown;
  heroSubtitulo?: unknown;
  ctaTexto?: unknown;
  bookingTitulo?: unknown;
  bookingUrl?: unknown;
};

type PaginaInicioSkeleton = EntrySkeletonType<
  PaginaInicioFields,
  "paginaInicio"
>;

type SeccionServicioFields = {
  titulo?: unknown;
  descripcion?: unknown;
  icono?: unknown;
};

type SeccionServicioSkeleton = EntrySkeletonType<
  SeccionServicioFields,
  "SeccionServicio"
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
  if (!hasContentfulConfig()) {
    console.warn("[Contentful] Config missing:", {
      spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      token: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN ? "***" : "undefined",
    });
    return null;
  }

  console.log("[Contentful] Creating client with space:", import.meta.env.VITE_CONTENTFUL_SPACE_ID);
  return createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
    environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || "master",
  });
}

export function mapPaginaInicio(
  entry: Entry<PaginaInicioSkeleton>,
): PaginaInicioContent {
  return {
    heroTitulo:
      readString(entry.fields.heroTitulo) ??
      "DBT web v1 — Psicoterapia con enfoque compasivo",
    heroSubtitulo:
      readString(entry.fields.heroSubtitulo) ??
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Construye habilidades para vivir con más equilibrio.",
    ctaTexto: readString(entry.fields.ctaTexto) ?? "Agendar",
    bookingTitulo: readString(entry.fields.bookingTitulo) ?? "Reserva tu cita",
    bookingUrl: readString(entry.fields.bookingUrl),
  };
}

export function mapSeccionServicio(
  entry: Entry<SeccionServicioSkeleton>,
): LandingService {
  const iconAsset = entry.fields.icono as unknown as Asset | undefined;
  const { url, alt } = readAssetUrl(iconAsset);

  return {
    titulo: readString(entry.fields.titulo) ?? "Servicio",
    descripcion:
      readString(entry.fields.descripcion) ??
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
    const response = await client.getEntries<PaginaInicioSkeleton>({
      content_type: "PaginaInicio",
      limit: 1,
      include: 2,
    });

    const entry = response.items?.[0];
    if (!entry) {
      console.warn("[Contentful] No PaginaInicio entry found");
      return null;
    }

    console.log("[Contentful] PaginaInicio fetched successfully", entry);
    return mapPaginaInicio(entry);
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
    const response = await client.getEntries<SeccionServicioSkeleton>({
      content_type: "SeccionServicio",
      order: ["sys.createdAt"],
      include: 2,
    });

    const items = (response.items ?? []) as Entry<SeccionServicioSkeleton>[];
    console.log("[Contentful] SeccionServicio entries fetched:", items.length, items);
    return items.map(mapSeccionServicio);
  } catch (error) {
    console.error("[Contentful] Error fetching SeccionServicio:", error);
    throw error;
  }
}
