import { useGames } from "./hooks/use-games";
import { useEffect, useMemo } from "react";
import { useInfiniteScroll } from "./hooks/use-infinite-scroll";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

type Props = {
  genre: string | null;
  search: string | null;
};

const GamesPage = ({ genre, search }: Props) => {
  // Fetching the data from the api using react query
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGames(8, genre, search);

  const loadMoreRef = useInfiniteScroll({
    enabled: !!hasNextPage && !isFetchingNextPage,
    onLoadMore: () => fetchNextPage(),
  });

  const games = useMemo(() => {
    return data?.pages.flatMap((p) => p.results) ?? [];
  }, [data?.pages]);

  // when the genre change or search something or page change page start with 0
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [genre, search]);

  if (isLoading)
    return (
      <div className='grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
        {Array.from({ length: 8 }).map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    );

  if (isError)
    return (
      <div className='flex items-center gap-4 h-screen justify-center'>
        <h1>{error.message}</h1>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );

  return (
    <div className='min-h-screen w-full bg-background flex flex-col justify-center'>
      <div className='grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
        <GameCard games={games} />
      </div>
      {/* Refetch on Page Scroll  */}
      {hasNextPage && <div ref={loadMoreRef} className='h-10' />}
      {/* Show loading when fetching next page */}
      {isFetchingNextPage && (
        <div className='grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
          {Array.from({ length: 4 }).map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        </div>
      )}
      {/* If the user scroll to the bottom or game not found then show no more game */}
      {!hasNextPage ? (
        <div className='min-h-screen w-full bg-background p-4 sm:px-6 lg:px-8 flex flex-col'>
          {games.length === 0 ? "No game found" : "No more games..."}
        </div>
      ) : null}
    </div>
  );
};

export default GamesPage;
