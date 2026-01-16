import { getGames } from "@/api/rawg/rawg-client";
import type { AllGame } from "@/api/rawg/rawg-types";
import { useQuery } from "@tanstack/react-query";

export function useGames() {
  return useQuery<AllGame>({
    queryKey: ["games"],
    queryFn: getGames,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
