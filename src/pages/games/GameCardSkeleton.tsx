const GameCardSkeleton = () => {
  return (
    <div className='rounded-md overflow-hidden border border-[#161616] shadow-sm'>
      <div className='h-48 bg-[#151515]' />

      <div className='p-4 space-y-3'>
        <div className='space-y-2'>
          <div className='h-4 w-3/4 bg-(--skeleton) rounded' />
          <div className='h-4 w-1/2 bg-(--skeleton) rounded' />
        </div>

        <div className='h-3 w-40 bg-(--skeleton) rounded' />

        <div className='flex gap-2'>
          <div className='h-5 w-14 bg-(--skeleton) rounded-full' />
          <div className='h-5 w-16 bg-(--skeleton) rounded-full' />
          <div className='h-5 w-12 bg-(--skeleton) rounded-full' />
        </div>

        <div className='flex items-center justify-between pt-3 border-t border-border'>
          <div className='flex gap-2'>
            <div className='h-4 w-4 bg-(--skeleton) rounded' />
            <div className='h-4 w-4 bg-(--skeleton) rounded' />
            <div className='h-4 w-4 bg-(--skeleton) rounded' />
          </div>

          <div className='flex items-center gap-2'>
            <div className='h-6 w-10 bg-(--skeleton) rounded' />
            <div className='h-4 w-10 bg-(--skeleton) rounded' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
