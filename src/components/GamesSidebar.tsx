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

const GENRES = [
  { label: "All", value: null },
  { label: "Action", value: "action" },
  { label: "Racing", value: "racing" },
  { label: "Strategy", value: "strategy" },
  { label: "Shooter", value: "shooter" },
  { label: "Adventure", value: "adventure" },
  { label: "Simulation", value: "simulation" },
  { label: "Puzzle", value: "puzzle" },
  { label: "Sports", value: "sports" },
  { label: "Casual", value: "casual" },
  { label: "Arcade", value: "arcade" },
  { label: "Platformer", value: "platformer" },
  { label: "Fighting", value: "fighting" },
];

export function GameSidebar() {
  const [params, setParams] = useSearchParams();
  const activeGenre = params.get("genre");

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Genres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {GENRES.map((g) => {
                const isActive = (g.value ?? null) === (activeGenre ?? null);

                return (
                  <SidebarMenuItem key={g.label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => {
                        const next = new URLSearchParams(params);
                        if (!g.value) next.delete("genre");
                        else next.set("genre", g.value);
                        setParams(next);
                      }}
                    >
                      {g.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
