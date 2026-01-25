import { NavLink } from "react-router-dom";
import { useGames } from "./hooks/use-games";
import { lazy, Suspense, useMemo } from "react";
import { useInfiniteScroll } from "./hooks/use-infinite-scroll";
import { Spinner } from "@/components/ui/spinner";
const GamesAvilabel = lazy(() => import("./GamesAvilabel"));
import { Star } from "lucide-react";

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
        <Spinner className='size-10 text-white/80' />
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
    <div className='min-h-screen w-full bg-linear-to-br p-4 sm:p-6 lg:p-8 flex flex-col'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {games.map((game) => (
          <NavLink
            to={`/games/${game.id}`}
            key={game.id}
            className='group rounded-md overflow-hidden 
            border border-black dark:border-white/5'
          >
            <div className='relative h-48'>
              <img
                src={game.background_image}
                alt={game.name}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 to-transparent' />
            </div>

            <div className='p-4 space-y-3'>
              <h2 className='font-semibold leading-tight line-clamp-2'>
                {game.name}
              </h2>

              {game.released && (
                <p className='text-xs text-gray-400'>
                  Released: {new Date(game.released).toDateString()}
                </p>
              )}

              {game.genres && (
                <div className='flex flex-wrap gap-2'>
                  {game.genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className='px-2 py-0.5 text-xs rounded bg-white/5 text-gray-300'
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className='flex items-center justify-between pt-3 border-t border-white/5'>
                <Suspense fallback={null}>
                  <GamesAvilabel platforms={game.parent_platforms} />
                </Suspense>

                <div className='flex items-center gap-2 text-sm'>
                  {game.metacritic && (
                    <span
                      className={`px-2 py-0.5 rounded font-medium ${
                        game.metacritic >= 75
                          ? "bg-green-500/20 text-green-400"
                          : game.metacritic >= 50
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {game.metacritic}
                    </span>
                  )}

                  <span className='text-gray-300 flex items-center gap-1'>
                    <Star className='text-yellow-400 size-4' />{" "}
                    {game.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      <div ref={loadMoreRef} className='h-10' />

      {isFetchingNextPage && (
        <div className='flex justify-center py-10'>
          <Spinner className='size-10 text-white' />
        </div>
      )}
      {!hasNextPage ? (
        <div className='flex items-center gap-4'>No more games</div>
      ) : null}
    </div>
  );
};

export default GamesPage;
