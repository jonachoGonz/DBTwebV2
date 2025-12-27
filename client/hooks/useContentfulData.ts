import { useQuery } from "@tanstack/react-query";
import { fallbackLandingContent } from "@/content/fallbackLandingContent";
import {
  fetchPaginaInicio,
  fetchSeccionServicios,
} from "@/services/contentful";
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
      services && services.length > 0
        ? services
        : fallbackLandingContent.services,
  };
}

export function useContentfulData() {
  return useQuery({
    queryKey: ["contentful", "landing"],
    queryFn: fetchLandingContent,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60, // Cache for 1 minute
    retry: 3, // Retry up to 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
}
