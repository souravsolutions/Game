import { getGames } from "@/api/rawg/rawg-client";
import type { AllGame } from "@/api/rawg/rawg-types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGames(
  pageSize: number,
  genre?: string | null,
  search?: string | null,
) {
  return useInfiniteQuery<AllGame>({
    //query key
    queryKey: [
      "games",
      { pageSize, genre: genre ?? null, search: search ?? null },
    ],
    //query function where the api will be called
    queryFn: ({ pageParam = 1, signal }) =>
      getGames(pageSize, Number(pageParam), genre, search, signal),

    // initial page 1
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length + 1;
    },

    // fresh for 10 minutes
    staleTime: 1000 * 60 * 10,
    // page change pe refetch
    refetchOnWindowFocus: false,
    // 10 minutes bad if you don't switch page clear the cache
    gcTime: 1000 * 60 * 10,
    //If the Api call fail retry 1 time
    retry: 1,
  });
}
