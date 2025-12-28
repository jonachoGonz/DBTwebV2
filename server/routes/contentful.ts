import { RequestHandler } from "express";
import { createClient } from "contentful";
import type { Asset, Entry, EntrySkeletonType } from "contentful";

type PaginaInicioFields = {
  heroTitulo?: unknown;
  heroSubtitulo?: unknown;
  ctaTexto?: unknown;
  bookingTitulo?: unknown;
  bookingUrl?: unknown;
};

type SeccionServicioFields = {
  titulo?: unknown;
  descripcion?: unknown;
  icono?: unknown;
};

type PaginaInicioSkeleton = EntrySkeletonType<PaginaInicioFields, "paginaInicio">;
type SeccionServicioSkeleton = EntrySkeletonType<SeccionServicioFields, "seccionServicio">;

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function readAssetUrl(asset: Asset | undefined): { url?: string; alt?: string } {
  const fileUrl = asset?.fields?.file && (asset.fields.file as any)?.url;
  const title = readString(asset?.fields?.title);

  if (!readString(fileUrl)) return { url: undefined, alt: title };

  const url: string = (fileUrl as string).startsWith("//")
    ? `https:${fileUrl}`
    : (fileUrl as string);

  return { url, alt: title };
}

function mapPaginaInicio(entry: Entry<PaginaInicioSkeleton>) {
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

function mapSeccionServicio(entry: Entry<SeccionServicioSkeleton>) {
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

export const handleContentfulLanding: RequestHandler = async (_req, res) => {
  try {
    const spaceId = process.env.VITE_CONTENTFUL_SPACE_ID;
    const token = process.env.VITE_CONTENTFUL_DELIVERY_TOKEN;

    if (!spaceId || !token) {
      return res.status(500).json({
        error: "Contentful credentials not configured",
        paginaInicio: null,
        services: [],
      });
    }

    const client = createClient({
      space: spaceId,
      accessToken: token,
      environment: process.env.VITE_CONTENTFUL_ENVIRONMENT || "master",
    });

    let paginaInicio = null;
    let services = [];

    try {
      const paginaInicioResponse = await client.getEntries<PaginaInicioSkeleton>({
        content_type: "5Ey3sNNCbytnoyjC4OmlNy",
        limit: 1,
        include: 2,
      });
      paginaInicio = paginaInicioResponse.items?.[0];
      console.log("[Contentful Server] PaginaInicio fetched:", paginaInicio ? "success" : "not found");
    } catch (error) {
      console.error("[Contentful Server] Error fetching PaginaInicio:", error);
    }

    try {
      const servicesResponse = await client.getEntries<SeccionServicioSkeleton>({
        content_type: "3dwLLZs9gGH5zEzwIoBebi",
        include: 2,
      });
      services = (servicesResponse.items ?? []).map((service) =>
        mapSeccionServicio(service as Entry<SeccionServicioSkeleton>)
      );
      console.log("[Contentful Server] Services fetched:", services.length, "items");
    } catch (error) {
      console.warn("[Contentful Server] Warning fetching services (will use empty):", error);
      services = [];
    }

    res.json({
      paginaInicio: paginaInicio ? mapPaginaInicio(paginaInicio) : null,
      services: services,
    });
  } catch (error) {
    console.error("[Contentful Server] Unexpected error:", error);
    res.status(500).json({
      error: String(error),
      paginaInicio: null,
      services: [],
    });
  }
};
