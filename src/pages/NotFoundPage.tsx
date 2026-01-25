import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 text-center'>
      <div className='relative mb-8 group'>
        <div className='absolute inset-0 translate-x-1 translate-y-1 bg-primary/20 blur-sm rounded-full animate-pulse' />
        <div className='relative bg-card p-8 rounded-full border-4 border-dashed border-muted-foreground/30 ring-4 ring-primary/10'>
          <Ghost className='w-24 h-24 text-primary' />
        </div>
      </div>

      <div className='space-y-2 mb-8'>
        <h1 className='text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600 animate-in fade-in slide-in-from-bottom-4 duration-500'>
          404
        </h1>
        <h2 className='text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] text-foreground animate-in fade-in slide-in-from-bottom-5 delay-150 duration-500'>
          Game Over
        </h2>
        <p className='text-muted-foreground max-w-150 mx-auto animate-in fade-in slide-in-from-bottom-6 delay-300 duration-500'>
          The level you are trying to access is locked, corrupted, or doesn't
          exist in this realm. Please insert a new coin or return to the main
          menu.
        </p>
      </div>
    </div>
  );
}
