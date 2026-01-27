import { getGames } from "@/api/rawg/rawg-client";
import type { AllGame } from "@/api/rawg/rawg-types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGames(
  pageSize: number,
  genre?: string | null,
  search?: string | null,
) {
  return useInfiniteQuery<AllGame>({
    queryKey: [
      "games",
      { pageSize, genre: genre ?? null, search: search ?? null },
    ],
    queryFn: ({ pageParam = 1, signal }) =>
      getGames(pageSize, Number(pageParam), genre, search, signal),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length + 1;
    },

    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
