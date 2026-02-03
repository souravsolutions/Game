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

import {
  LayoutGrid,
  Flame,
  Crosshair,
  Compass,
  Trophy,
  Car,
  Brain,
  Cpu,
  Puzzle,
  Smile,
  Gamepad2,
  Box,
  Swords,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

import { useSearchParams } from "react-router-dom";

type GenreItem = {
  label: string;
  value: string | null;
  icon?: ReactNode | null;
};

const ALL: GenreItem[] = [
  { label: "All", value: null, icon: <LayoutGrid size={16} /> },
];

const POPULAR: GenreItem[] = [
  { label: "Action", value: "action", icon: <Flame size={16} /> },
  { label: "Shooter", value: "shooter", icon: <Crosshair size={16} /> },
  { label: "Adventure", value: "adventure", icon: <Compass size={16} /> },
  { label: "Sports", value: "sports", icon: <Trophy size={16} /> },
  { label: "Racing", value: "racing", icon: <Car size={16} /> },
  { label: "Strategy", value: "strategy", icon: <Brain size={16} /> },
];

const MORE: GenreItem[] = [
  { label: "Simulation", value: "simulation", icon: <Cpu size={16} /> },
  { label: "Puzzle", value: "puzzle", icon: <Puzzle size={16} /> },
  { label: "Casual", value: "casual", icon: <Smile size={16} /> },
  { label: "Arcade", value: "arcade", icon: <Gamepad2 size={16} /> },
  { label: "Platformer", value: "platformer", icon: <Box size={16} /> },
  { label: "Fighting", value: "fighting", icon: <Swords size={16} /> },
  {
    label: "Multiplayer",
    value: "massively-multiplayer",
    icon: <Users size={16} />,
  },
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
                  className='text-sm flex gap-4'
                >
                  {g.icon}
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
