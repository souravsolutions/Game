import { getGameScreenshots } from "@/api/rawg/rawg-client";
import type { ScreenshotsResponse } from "@/api/rawg/rawg-types";
import { useQuery } from "@tanstack/react-query";

export function useGameScreenshots(id: number) {
  return useQuery<ScreenshotsResponse>({
    queryKey: ["game-screenshots", id],
    queryFn: () => getGameScreenshots(id),
    enabled: Number.isFinite(id),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
