import {
  MoveLeftIcon,
  type MoveLeftIconHandle,
} from "@/components/icons/MoveLeftIcon";

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGame } from "./hooks/use-game";
import { Spinner } from "@/components/ui/spinner";
import Screenshot from "./Screenshot";

const GamePage = () => {
  const navigate = useNavigate();
  const moveRef = useRef<MoveLeftIconHandle>(null);

  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data, isLoading, isError, error, refetch } = useGame(id);

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
    <div className='flex flex-col'>
      <Button
        onClick={() => navigate(-1)}
        onMouseEnter={() => moveRef.current?.startAnimation()}
        onMouseLeave={() => moveRef.current?.stopAnimation()}
      >
        <MoveLeftIcon ref={moveRef} />
      </Button>

      <div className='flex gap-4'>
        <div className='w-1/2 flex flex-col items-center'>
          {data?.name}
          <p>{data?.description_raw}</p>
        </div>

        <div className='w-1/2 h-'>
          <Screenshot id={id} />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
