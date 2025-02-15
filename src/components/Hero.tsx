import lightThemeBackground from "@/assets/flights_nc_4.svg";
import darkThemeBackground from "@/assets/flights_nc_dark_theme_4.svg";
import SVG from "react-inlinesvg";
import { useTheme } from "@/context/ThemeProvider";

export function Hero() {
  const { theme } = useTheme();

  return (
    <div className="relative w-full h-[300px] overflow-hidden transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute inset-0">
        <SVG
          src={lightThemeBackground}
          className={`w-full h-full object-cover ${theme === "light" ? "block" : "hidden"}`}
        />
        <SVG
          src={darkThemeBackground}
          className={`w-full h-full object-cover ${theme === "dark" ? "block" : "hidden"}`}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold text-foreground transition-colors duration-300">Flights</h1>
      </div>
    </div>
  );
}
