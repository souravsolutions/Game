import { SunIcon, MoonStarIcon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-accent transition"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="size-4" />
      ) : (
        <MoonStarIcon className="size-4" />
      )}
    </button>
  );
}
