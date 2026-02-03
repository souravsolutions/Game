import { lazy, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { Star } from "lucide-react";
import type { Game } from "@/api/rawg/rawg-types";

const GamesAvailable = lazy(() => import("./GamesAvailable"));

type Props = {
  games: Game[];
};

const GameCard = ({ games }: Props) => {
  return (
    <>
      {games.map((game) => (
        <NavLink
          to={`/games/${game.id}`}
          key={game.id}
          className='group rounded-md overflow-hidden bg-card 
            border border-border shadow-sm'
        >
          <div className='relative h-48'>
            <img
              src={game.background_image}
              alt={game.name}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
          </div>

          <div className='p-4 space-y-3'>
            <h2 className='font-semibold leading-tight line-clamp-2'>
              {game.name}
            </h2>

            {game.released && (
              <p className='text-xs text-muted-foreground'>
                Released: {new Date(game.released).toDateString()}
              </p>
            )}

            {game.genres && (
              <div className='flex flex-wrap gap-2'>
                {game.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre.id}
                    className='px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className='flex items-center justify-between pt-3 border-t border-border'>
              <Suspense fallback={<div>Loading...</div>}>
                <GamesAvailable platforms={game.parent_platforms} />
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

                <span className='text-muted-foreground flex items-center gap-1'>
                  <Star className='text-yellow-400 size-4' />{" "}
                  {game.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default GameCard;
