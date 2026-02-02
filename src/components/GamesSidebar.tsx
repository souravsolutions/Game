import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSearchParams } from "react-router-dom";

type GenreItem = { label: string; value: string | null };

const ALL: GenreItem[] = [{ label: "All", value: null }];

const POPULAR: GenreItem[] = [
  { label: "Action", value: "action" },
  { label: "Shooter", value: "shooter" },
  { label: "Adventure", value: "adventure" },
  { label: "Sports", value: "sports" },
  { label: "Racing", value: "racing" },
  { label: "Strategy", value: "strategy" },
];

const MORE: GenreItem[] = [
  { label: "Simulation", value: "simulation" },
  { label: "Puzzle", value: "puzzle" },
  { label: "Casual", value: "casual" },
  { label: "Arcade", value: "arcade" },
  { label: "Platformer", value: "platformer" },
  { label: "Fighting", value: "fighting" },
  { label: "Multiplayer", value: "massively-multiplayer" },
];

function GenreSection({
  title,
  items,
  activeGenre,
  onSelect,
}: {
  title: string;
  items: GenreItem[];
  activeGenre: string | null;
  onSelect: (value: string | null) => void;
}) {
  return (
    <SidebarGroup className='py-1 font-ubuntu'>
      <SidebarGroupLabel className='text-xs tracking-wide text-muted-foreground'>
        {title}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu className='pl-2 space-y-1 font-geist'>
          {items.map((g) => {
            const isActive = (g.value ?? null) === (activeGenre ?? null);

            return (
              <SidebarMenuItem key={g.label}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => onSelect(g.value)}
                  className='text-sm'
                >
                  {g.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function GameSidebar() {
  const [params, setParams] = useSearchParams();
  const activeGenre = params.get("genre");

  const selectGenre = (value: string | null) => {
    const next = new URLSearchParams(params);

    if (!value) next.delete("genre");
    else next.set("genre", value);

    setParams(next);
  };

  return (
    <Sidebar>
      <SidebarContent className='py-2'>
        <GenreSection
          title='All Games'
          items={ALL}
          activeGenre={activeGenre}
          onSelect={selectGenre}
        />

        <GenreSection
          title='Popular Genres'
          items={POPULAR}
          activeGenre={activeGenre}
          onSelect={selectGenre}
        />

        <GenreSection
          title='More'
          items={MORE}
          activeGenre={activeGenre}
          onSelect={selectGenre}
        />
      </SidebarContent>
    </Sidebar>
  );
}
