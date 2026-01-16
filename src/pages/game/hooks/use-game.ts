import { getGame } from "@/api/rawg/rawg-client";
import type { SingleGame } from "@/api/rawg/rawg-types";
import { useQuery } from "@tanstack/react-query";

export function useGame(id: number) {
  return useQuery<SingleGame>({
    queryKey: ["game", id],
    queryFn: () => getGame(id),
    enabled: Number.isFinite(id),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
