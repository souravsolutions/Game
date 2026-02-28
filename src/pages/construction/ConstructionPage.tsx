import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const ORB_X_OFFSET = 28;
const ORB_Y_OFFSET = 18;

export default function ConstructionPage() {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-background text-foreground'>
      <div aria-hidden className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.10),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.14),transparent_55%)]' />

        <div className='absolute inset-0 opacity-80 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]'>
          <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[56px_56px]' />
        </div>

        <motion.div
          className='absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-linear-to-tr from-blue-500/10 to-cyan-400/10 blur-3xl'
          animate={{
            x: [0, ORB_X_OFFSET, -ORB_X_OFFSET, 0],
            y: [0, -ORB_Y_OFFSET, ORB_Y_OFFSET, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 10,
            ease: "easeInOut",
          }}
        />
      </div>

      <header className='flex h-14 items-center justify-between px-4 sm:px-6'>
        <div className='flex items-center gap-2'>
          <span className='inline-flex size-8 items-center justify-center rounded-md border border-border bg-card/40 backdrop-blur'>
            <img
              src='/games-mark.svg'
              alt='Games'
              className='size-4 opacity-90'
            />
          </span>
          <span className='font-orbitron text-sm tracking-wide text-muted-foreground'>
            Games
          </span>
        </div>
        <ModeToggle />
      </header>

      <main className='mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col items-center justify-center px-6 pb-10 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='w-full'
        >
          <p className='mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs text-muted-foreground shadow-xs backdrop-blur'>
            <span className='inline-flex size-1.5 rounded-full bg-primary/70' />
            Calm build in progress
          </p>

          <h1 className='font-orbitron text-4xl leading-tight tracking-tight sm:text-5xl'>
            Under Construction
          </h1>
          <p className='mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground'>
            The landing page is getting tuned. Until then, jump straight into the
            games library.
          </p>

          <div className='mt-8 flex items-center justify-center gap-3'>
            <Button asChild size='lg' className='rounded-xl'>
              <Link to='/games'>Go to /games</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
