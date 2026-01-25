import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { GameSidebar } from "@/components/GamesSidebar";
import GamesPage from "./GamesPage";
import GamesSearch from "./GamesSearch";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import { useRef } from "react";

const MainGamePage = () => {
  const [params] = useSearchParams();
  const genre = params.get("genre");
  const search = params.get("search");

  const navRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (navRef) {
      navRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className='flex min-h-screen w-full'>
        <GameSidebar />

        <main className='flex-1' ref={navRef}>
          <header className='flex h-14 items-center gap-2 border-b px-4'>
            <SidebarTrigger />

            <div className='flex flex-1 items-center justify-between gap-3'>
              <GamesSearch />
              <ModeToggle />
            </div>
          </header>

          <section className='p-4 sm:p-6 lg:p-8'>
            <GamesPage genre={genre} search={search} />
          </section>
        </main>

        <div className='flex flex-col gap-8 bottom-4 right-4 fixed'>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full'
            onClick={handleClick}
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainGamePage;
