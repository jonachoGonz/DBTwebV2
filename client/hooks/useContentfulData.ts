import { useQuery } from "@tanstack/react-query";
import { fallbackLandingContent } from "@/content/fallbackLandingContent";
import { fetchPaginaInicio, fetchSeccionServicios } from "@/services/contentful";
import type { LandingContent } from "@/types/contentful";

async function fetchLandingContent(): Promise<LandingContent> {
  const [paginaInicio, services] = await Promise.all([
    fetchPaginaInicio(),
    fetchSeccionServicios(),
  ]);

  const base = paginaInicio
    ? { ...fallbackLandingContent, ...paginaInicio }
    : fallbackLandingContent;

  return {
    ...base,
    services:
      services && services.length > 0 ? services : fallbackLandingContent.services,
  };
}

export function useContentfulData() {
  return useQuery({
    queryKey: ["contentful", "landing"],
    queryFn: fetchLandingContent,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
