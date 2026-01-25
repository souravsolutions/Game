import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, Star, Trophy, Clock, ChevronDown } from "lucide-react";

import { useGame } from "./hooks/use-game";
import Screenshot from "./Screenshot";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  MoveLeftIcon,
  type MoveLeftIconHandle,
} from "@/components/icons/MoveLeftIcon";
import { cn } from "@/lib/utils";
import GamesAvailable from "../games/GamesAvilabel";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";

const GamePage = () => {
  const navigate = useNavigate();
  const moveRef = useRef<MoveLeftIconHandle>(null);
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const { data: game, isLoading, isError, error, refetch } = useGame(id);

  if (isLoading)
    return (
      <div className='flex items-center gap-4 h-screen justify-center bg-background'>
        <Spinner className='size-10 text-primary/80' />
      </div>
    );

  if (isError)
    return (
      <div className='flex flex-col items-center gap-4 h-screen justify-center bg-background text-foreground'>
        <h1 className='text-xl text-destructive'>{error.message}</h1>
        <Button variant='outline' onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );

  return (
    <div className='min-h-screen bg-background text-foreground font-sans selection:bg-primary/30'>
      <div className='relative h-[80vh] w-full overflow-hidden'>
        <motion.div style={{ y, opacity }} className='absolute inset-0'>
          <img
            src={game?.background_image}
            alt={game?.name}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-linear-to-t from-background via-background/40 to-black/30' />
          <div className='absolute inset-0 bg-linear-to-r from-background/80 via-transparent to-transparent' />
        </motion.div>

        <div className='fixed top-6 left-6 z-50'>
          <Button
            onClick={() => navigate(-1)}
            onMouseEnter={() => moveRef.current?.startAnimation()}
            onMouseLeave={() => moveRef.current?.stopAnimation()}
            className='bg-background/20 hover:bg-background/40 backdrop-blur-xl border border-border/10 text-foreground rounded-full h-12 w-12 p-0 flex items-center justify-center transition-all duration-300 group shadow-2xl hover:scale-110 active:scale-95'
          >
            <MoveLeftIcon
              ref={moveRef}
              className='size-6 text-foreground group-hover:-translate-x-0.5 transition-transform'
            />
          </Button>
        </div>

        <div className='absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto z-10'>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='max-w-4xl space-y-6'
          >
            <div className='flex flex-wrap items-center gap-3 mb-4'>
              {game?.released && (
                <span className='px-3 py-1.5 rounded-full bg-secondary/10 backdrop-blur-md border border-border/10 text-xs font-medium text-muted-foreground shadow-sm'>
                  {new Date(game.released).getFullYear()}
                </span>
              )}

              {game?.parent_platforms && (
                <span className='px-3 py-1.5 flex items-center justify-center rounded-full bg-secondary/10 backdrop-blur-md border border-border/10 text-muted-foreground shadow-sm'>
                  <GamesAvailable platforms={game.parent_platforms} />
                </span>
              )}
            </div>

            <h1 className='text-5xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter drop-shadow-2xl leading-[0.9] font-orbitron'>
              {game?.name}
            </h1>

            <div className='flex flex-wrap items-center gap-6 text-sm md:text-base font-medium pt-2'>
              {game?.metacritic_platforms?.[0]?.metascore && (
                <div className='flex items-center gap-2'>
                  <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 font-bold'>
                    {game.metacritic_platforms[0].metascore}
                  </div>
                  <span className='text-zinc-400'>Metascore</span>
                </div>
              )}
              <div className='flex items-center gap-2'>
                <Star className='size-5 text-yellow-500 fill-yellow-500' />
                <span className='text-foreground font-bold text-lg'>
                  {game?.rating}
                </span>
                <span className='text-muted-foreground'>/ 5</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16'>
        <div className='space-y-16'>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            <h2 className='text-3xl font-bold text-foreground flex items-center gap-3'>
              <span className='w-1.5 h-8 bg-linear-to-b from-blue-500 to-blue-200 rounded-full font-orbitron' />
              About the Game
            </h2>

            <div className='relative group'>
              <div
                className={cn(
                  "text-lg text-muted-foreground leading-relaxed font-light overflow-hidden transition-all duration-500 font-geist",
                  !isExpanded ? "max-h-45" : "max-h-500",
                )}
              >
                {game?.description_raw}
              </div>

              {!isExpanded && (
                <div className='absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent pointer-events-none' />
              )}

              {game?.description_raw && game.description_raw.length > 300 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className='mt-4 flex items-center gap-2 text-muted-foreground hover:text-primary font-medium transition-colors group-hover:translate-y-1'
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronDown className='size-4 rotate-180' />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className='size-4' />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>

          <div className='pt-8'>
            <h2 className='text-3xl font-bold text-foreground flex items-center gap-3 mb-8'>
              <span className='w-1.5 h-8 bg-linear-to-b from-blue-500 to-blue-200 rounded-full font-ubuntu' />
              Visuals
            </h2>
            <Screenshot id={id} />
          </div>
        </div>

        <div className='relative'>
          <div className='sticky top-8 space-y-8'>
            {game?.website && (
              <a
                href={game.website}
                target='_blank'
                rel='noopener noreferrer'
                className='block'
              >
                <Button
                  className='w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 rounded-xl text-lg font-bold shadow-lg 
                shadow-primary/5 transition-all'
                >
                  <ExternalLinkIcon className='size-5 mr-2' />
                  Visit Official Website
                </Button>
              </a>
            )}

            <div className='bg-card/40 backdrop-blur-xl rounded-3xl border border-border p-8 space-y-8 shadow-2xl'>
              <div>
                <h3 className='text-muted-foreground font-medium mb-3 uppercase tracking-wider text-xs'>
                  Details
                </h3>
                <dl className='space-y-5'>
                  <div className='flex justify-between items-center'>
                    <dt className='flex items-center gap-3 text-muted-foreground'>
                      <div className='p-2 bg-secondary rounded-lg'>
                        <Calendar className='size-4 text-secondary-foreground' />
                      </div>
                      Release Date
                    </dt>
                    <dd className='font-medium text-foreground'>
                      {game?.released
                        ? new Date(game.released).toLocaleDateString()
                        : "TBA"}
                    </dd>
                  </div>

                  <div className='flex justify-between items-center'>
                    <dt className='flex items-center gap-3 text-muted-foreground'>
                      <div className='p-2 bg-secondary rounded-lg'>
                        <Clock className='size-4 text-secondary-foreground' />
                      </div>
                      Playtime
                    </dt>
                    <dd className='font-medium text-foreground'>
                      {game?.playtime ? `~${game.playtime} hours` : "N/A"}
                    </dd>
                  </div>

                  <div className='flex justify-between items-center'>
                    <dt className='flex items-center gap-3 text-muted-foreground'>
                      <div className='p-2 bg-secondary rounded-lg'>
                        <Trophy className='size-4 text-secondary-foreground' />
                      </div>
                      Achievemets
                    </dt>
                    <dd className='font-medium text-foreground'>
                      {game?.achievements_count || "-"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className='w-full h-px bg-border' />

              <div>
                <h3 className='text-muted-foreground font-medium mb-4 uppercase tracking-wider text-xs'>
                  Genres
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {game?.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className='px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-muted-foreground text-sm hover:bg-secondary hover:border-border transition-colors cursor-default'
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className='w-full h-px bg-border' />

              <div>
                <h3 className='text-muted-foreground font-medium mb-4 uppercase tracking-wider text-xs'>
                  Publishers
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {game?.publishers?.map((pub) => (
                    <span
                      key={pub.id}
                      className='text-sm text-muted-foreground'
                    >
                      {pub.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
