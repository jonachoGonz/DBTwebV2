import { useQuery } from "@tanstack/react-query";
import { fallbackLandingContent } from "@/content/fallbackLandingContent";
import type { LandingContent } from "@/types/contentful";

async function fetchLandingContent(): Promise<LandingContent> {
  try {
    const response = await fetch("/api/contentful/landing", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const base = data.paginaInicio
      ? { ...fallbackLandingContent, ...data.paginaInicio }
      : fallbackLandingContent;

    return {
      ...base,
      services:
        data.services && data.services.length > 0
          ? data.services
          : fallbackLandingContent.services,
    };
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
