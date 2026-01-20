import { useSearchParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { GameSidebar } from "@/components/GamesSidebar";
import GamesPage from "./GamesPage";
import GamesSearch from "./GamesSearch";

const MainGamePage = () => {
  const [params] = useSearchParams();
  const genre = params.get("genre");
  const search = params.get("search");

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <GameSidebar />

        <main className='flex-1 p-4 sm:p-6 lg:p-8'>
          <div className='flex items-center justify-between'>
            <GamesSearch />
            <ModeToggle />
          </div>

          <GamesPage genre={genre} search={search} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainGamePage;
