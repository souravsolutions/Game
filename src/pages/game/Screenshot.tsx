import { Spinner } from "@/components/ui/spinner";
import { useGameScreenshots } from "./hooks/use-gameScreenshot";

const Screenshot = ({ id }: { id: number }) => {
  const { data, isLoading, isError, error, refetch } = useGameScreenshots(id);

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
    <div className="flex flex-wrap">
      {data?.results.map((screenshot) => (
        <img
          key={screenshot.id}
          src={screenshot.image}
          alt={screenshot.id.toString()}
          className="h-70 w-78"
        />
      ))}
    </div>
  );
};

export default Screenshot;
