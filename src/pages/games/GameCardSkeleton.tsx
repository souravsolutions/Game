import { Skeleton } from "@/components/ui/skeleton";

const GameCardSkeleton = () => {
  return (
    <div className='rounded-md overflow-hidden border border-border shadow-sm'>
      <Skeleton className='h-48 rounded-none' />

      <div className='p-4 space-y-3'>
        <div className='space-y-2'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>

        <Skeleton className='h-3 w-40' />

        <div className='flex gap-2'>
          <Skeleton className='h-5 w-14 rounded-full' />
          <Skeleton className='h-5 w-16 rounded-full' />
          <Skeleton className='h-5 w-12 rounded-full' />
        </div>

        <div className='flex items-center justify-between pt-3 border-t border-border'>
          <div className='flex gap-2'>
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-4' />
          </div>

          <div className='flex items-center gap-2'>
            <Skeleton className='h-6 w-10' />
            <Skeleton className='h-4 w-10' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
