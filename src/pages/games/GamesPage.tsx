import { useGames } from "./hooks/use-games";
import { useMemo } from "react";
import { useInfiniteScroll } from "./hooks/use-infinite-scroll";
import { Spinner } from "@/components/ui/spinner";
import GameCard from "./GameCard";

type Props = {
  genre: string | null;
  search: string | null;
};

const GamesPage = ({ genre, search }: Props) => {
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

  if (isLoading)
    return (
      <div className='flex items-center gap-4 h-screen justify-center'>
        <Spinner className='size-10 text-primary/80' />
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
    <div className='min-h-screen w-full bg-background p-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
      <div className='grid gap-8 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
        <GameCard games={games} />
      </div>
      {hasNextPage && <div ref={loadMoreRef} className='h-10' />}

      {isFetchingNextPage && (
        <div className='flex justify-center py-10'>
          <Spinner className='size-10 text-primary' />
        </div>
      )}
      {!hasNextPage ? (
        <div className='flex items-center justify-center gap-4'>
          No more games...
        </div>
      ) : null}
    </div>
  );
};

export default GamesPage;
