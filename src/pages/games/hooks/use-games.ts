import { getGames } from "@/api/rawg/rawg-client";
import type { AllGame } from "@/api/rawg/rawg-types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useGames(pageSize: number) {
  return useInfiniteQuery<AllGame>({
    queryKey: ["games", { pageSize }],
    queryFn: ({ pageParam = 1 }) => getGames(Number(pageParam), pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
