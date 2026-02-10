import { getGameScreenshots } from "@/api/rawg/rawg-client";
import type { ScreenshotsResponse } from "@/api/rawg/rawg-types";
import { useQuery } from "@tanstack/react-query";

export function useGameScreenshots(id: number) {
  return useQuery<ScreenshotsResponse>({
    //Here we pass the game id because when the id change the api will be called means function will be called
    queryKey: ["game-screenshots", id],
    //This is the query function
    queryFn: () => getGameScreenshots(id),
    //If enabled true api will be called otherwise not
    enabled: Number.isFinite(id),
    //Fresh for 10 minutes
    staleTime: 1000 * 60 * 10,
    //If the api fetching fail retry 1 time
    retry: 1,
  });
}
