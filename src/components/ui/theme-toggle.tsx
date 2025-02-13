import { useTheme } from "@/context/ThemeProvider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="rounded-md p-2 hover:bg-surface-container-high" aria-label="Toggle theme">
      {theme === "light" ? <Moon className="h-5 w-5 text-on-surface" /> : <Sun className="h-5 w-5 text-on-surface" />}
    </button>
  );
}
