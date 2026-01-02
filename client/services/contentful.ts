import {
  createClient,
  type Asset,
  type Entry,
  type EntrySkeletonType,
} from "contentful";
import type {
  EquipoMiembro,
  LandingService,
  OurSpaceSlide,
  PaginaInicioContent,
  ServicioItem,
} from "@/types/contentful";

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

  espacioSubtitulo?: unknown;
  espacioTitulo?: unknown;
  espacioLinkTexto?: unknown;
  espacioLinkUrl?: unknown;
  espacioCss?: unknown;
  espacioSlides?: unknown;

  somosImagen?: unknown;
  somosTitulo?: unknown;
  somosSubtitulo?: unknown;
  somosContenido?: unknown;
  somosCss?: unknown;

  serviciosTitulo?: unknown;
  serviciosSubtitulo?: unknown;
  serviciosCss?: unknown;
  listaServicios?: unknown;

  equipoTitulo?: unknown;
  equipoDescripcion?: unknown;
  equipoSubtitulo?: unknown;
  equipoCss?: unknown;
  listaEquipo?: unknown;
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

type EspacioSlideFields = {
  titulo?: unknown;
  imagen?: unknown;
  enlace?: unknown;
};

type EspacioSlideSkeleton = EntrySkeletonType<
  EspacioSlideFields,
  "espacioSlide"
>;

type ServicioItemFields = {
  titulo?: unknown;
  contenido?: unknown;
};

type ServicioItemSkeleton = EntrySkeletonType<
  ServicioItemFields,
  "servicioItem"
>;

type EquipoMiembroFields = {
  nombre?: unknown;
  rol?: unknown;
  imagen?: unknown;
  descripcion?: unknown;
  formacion?: unknown;
  linkedinUrl?: unknown;
  instagramUrl?: unknown;
  agendaUrl?: unknown;
};

type EquipoMiembroSkeleton = EntrySkeletonType<
  EquipoMiembroFields,
  "equipoMiembro"
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

function mapEspacioSlide(entry: Entry<EspacioSlideSkeleton>): OurSpaceSlide {
  const fields = entry.fields as any;
  const imageAsset = (fields.imagen || fields.image) as unknown as
    | Asset
    | undefined;
  const { url, alt } = readAssetUrl(imageAsset);

  return {
    titulo: readString(fields.titulo || fields.title) ?? "",
    imagenUrl: url,
    imagenAlt: alt,
    enlace: readString(fields.enlace || fields.link || fields.url),
  };
}

function isEntryLike(value: unknown): value is { fields: unknown } {
  return Boolean(
    value && typeof value === "object" && "fields" in (value as any),
  );
}

type RichTextNode = {
  nodeType?: string;
  value?: string;
  content?: RichTextNode[];
};

function richTextToPlainText(value: unknown): string | undefined {
  if (typeof value === "string") return readString(value);
  if (!value || typeof value !== "object") return undefined;

  const root = value as RichTextNode;
  const parts: string[] = [];

  const visit = (node: RichTextNode) => {
    if (node.nodeType === "text" && typeof node.value === "string") {
      parts.push(node.value);
    }

    if (Array.isArray(node.content)) {
      node.content.forEach(visit);

      if (node.nodeType === "paragraph") {
        parts.push("\n");
      }
    }
  };

  visit(root);

  const text = parts.join("").replace(/\n\n+/g, "\n\n").trim();
  return text.length > 0 ? text : undefined;
}

function mapServicioItem(entry: Entry<ServicioItemSkeleton>): ServicioItem {
  const fields = entry.fields as any;

  return {
    titulo: readString(fields.titulo || fields.title) ?? "",
    contenido:
      readString(fields.contenido || fields.content) ||
      richTextToPlainText(fields.contenido || fields.content),
  };
}

function mapEquipoMiembro(entry: Entry<EquipoMiembroSkeleton>): EquipoMiembro {
  const fields = entry.fields as any;
  const imageAsset = (fields.imagen ||
    fields.image ||
    fields.foto) as unknown as Asset | undefined;
  const { url, alt } = readAssetUrl(imageAsset);

  return {
    nombre: readString(fields.nombre || fields.name) ?? "",
    rol: readString(fields.rol || fields.role),
    imagenUrl: url,
    imagenAlt: alt,
    descripcion:
      readString(fields.descripcion || fields.bio) ||
      richTextToPlainText(fields.descripcion || fields.bio),
    formacion:
      readString(fields.formacion || fields.education) ||
      richTextToPlainText(fields.formacion || fields.education),
    linkedinUrl: readString(
      fields.linkedinUrl || fields.linkedin || fields.linkedInUrl,
    ),
    instagramUrl: readString(fields.instagramUrl || fields.instagram),
    agendaUrl: readString(
      fields.agendaUrl || fields.bookingUrl || fields.agendarUrl,
    ),
  };
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

  const espacioSubtitulo = readString(fields.espacioSubtitulo);
  const espacioTitulo = readString(fields.espacioTitulo);
  const espacioLinkTexto = readString(fields.espacioLinkTexto);
  const espacioLinkUrl = readString(fields.espacioLinkUrl);
  const espacioCss = readString(fields.espacioCss);

  const rawSlides = fields.espacioSlides as unknown;
  const slides = Array.isArray(rawSlides)
    ? (rawSlides.filter(isEntryLike) as Entry<EspacioSlideSkeleton>[]).map(
        (slide) => mapEspacioSlide(slide),
      )
    : undefined;

  const somosImagenAsset = (fields.somosImagen ||
    fields.aboutImage ||
    fields.somosImage) as unknown as Asset | undefined;
  const somosImagen = readAssetUrl(somosImagenAsset);

  const somosTitulo = readString(fields.somosTitulo || fields.aboutTitle);
  const somosSubtitulo = readString(
    fields.somosSubtitulo || fields.aboutSubtitle,
  );

  const somosContenido =
    readString(fields.somosContenido || fields.aboutContent) ||
    richTextToPlainText(fields.somosContenido || fields.aboutContent);

  const somosCss = readString(fields.somosCss || fields.aboutCss);

  const serviciosTitulo = readString(fields.serviciosTitulo);
  const serviciosSubtitulo = readString(fields.serviciosSubtitulo);
  const serviciosCss = readString(fields.serviciosCss);

  const rawListaServicios = (fields.listaServicios ||
    fields.listaServicio ||
    fields.serviceItems) as unknown;

  const listaServicios = Array.isArray(rawListaServicios)
    ? (
        rawListaServicios.filter(isEntryLike) as Entry<ServicioItemSkeleton>[]
      ).map((item) => mapServicioItem(item))
    : undefined;

  const equipoTitulo = readString(fields.equipoTitulo || fields.teamTitle);
  const equipoDescripcion =
    readString(fields.equipoDescripcion || fields.teamDescription) ||
    richTextToPlainText(fields.equipoDescripcion || fields.teamDescription);
  const equipoSubtitulo = readString(
    fields.equipoSubtitulo || fields.teamSubtitle,
  );
  const equipoCss = readString(fields.equipoCss || fields.teamCss);

  const rawListaEquipo = (fields.listaEquipo || fields.teamMembers) as unknown;
  const listaEquipo = Array.isArray(rawListaEquipo)
    ? (
        rawListaEquipo.filter(isEntryLike) as Entry<EquipoMiembroSkeleton>[]
      ).map((member) => mapEquipoMiembro(member))
    : undefined;

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

    espacioSubtitulo,
    espacioTitulo,
    espacioLinkTexto,
    espacioLinkUrl,
    espacioCss,
    espacioSlides: slides,

    somosImagenUrl: somosImagen.url,
    somosImagenAlt: somosImagen.alt,
    somosTitulo,
    somosSubtitulo,
    somosContenido,
    somosCss,

    serviciosTitulo,
    serviciosSubtitulo,
    serviciosCss,
    listaServicios,

    equipoTitulo,
    equipoDescripcion,
    equipoSubtitulo,
    equipoCss,
    listaEquipo,
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
