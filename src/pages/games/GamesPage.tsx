import { NavLink } from "react-router-dom";
import { useGames } from "./hooks/use-games";
import { lazy, Suspense } from "react";
const GamesAvilabel = lazy(() => import("./GamesAvilabel"));

const GamesPage = () => {
  const { data, isLoading, isError, error, refetch } = useGames();

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        <h1>{error.message}</h1>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );

  return (
    <div className='min-h-screen w-full p-4 sm:p-6 lg:p-8 bg-[#313244]'>
      <h1>{data?.count}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
        {data?.results.map((game) => (
          <NavLink to={`/${game.id}`} key={game.id} className='block-group'>
            <div className='h-auto bg-[#1e1e2e]'>
              <img
                src={game.background_image}
                alt={game.name}
                className='w-full h-48 sm:h-52 lg:h-56 object-cover'
              />
              <Suspense fallback={<div>Loading...</div>}>
                <GamesAvilabel platforms={game?.parent_platforms}/>
              </Suspense>
              <div className="flex gap-10">
              <h2>{game.name}</h2>
              <p>{game.rating}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
