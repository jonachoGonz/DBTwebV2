import { useQuery } from "@tanstack/react-query";
import { fallbackLandingContent } from "@/content/fallbackLandingContent";
import type { LandingContent } from "@/types/contentful";
import { fetchPaginaInicio } from "@/services/contentful";

async function fetchLandingContent(): Promise<LandingContent> {
  try {
    const paginaInicio = await fetchPaginaInicio();

    return paginaInicio
      ? { ...fallbackLandingContent, ...paginaInicio }
      : fallbackLandingContent;
  } catch (error) {
    console.error("[useContentfulData] Error fetching landing content:", error);
    throw error;
  }
}

export function useContentfulData() {
  return useQuery({
    queryKey: ["contentful", "landing"],
    queryFn: fetchLandingContent,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60,
    retry: 1,
    retryDelay: 1000,
    // If API fails, still return fallback content instead of showing error
    placeholderData: fallbackLandingContent,
  });
}
