import { getGame } from "@/api/rawg/rawg-client";
import type { SingleGame } from "@/api/rawg/rawg-types";
import { useQuery } from "@tanstack/react-query";

export function useGame(id: number) {
  return useQuery<SingleGame>({
    //Here we pass the game id because when the id change the api will be called means function will be called
    queryKey: ["game", id],
    //This is the query function
    queryFn: () => getGame(id),
    //If enabled true api will be called otherwise not
    enabled: Number.isFinite(id),
    //Fresh for 10 minutes and then page change pe refetch
    staleTime: 1000 * 60 * 10,
    //If the Api call fail retry 1 time
    retry: 1,
  });
}
