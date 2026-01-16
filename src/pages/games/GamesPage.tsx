import { useGames } from "./hooks/use-games";

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
    <div className='height-full width-full '>
      <h1>{data?.count}</h1>
      <div className='flex flex-wrap gap-4'>
        {data?.results.map((game) => (
          <div key={game.id}>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;
