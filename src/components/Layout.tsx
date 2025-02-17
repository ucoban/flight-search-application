import { ReactNode } from "react";
import { ThemeToggle } from "./ui/theme-toggle";
import SVG from "react-inlinesvg";
import githubIcon from "../assets/github.svg";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b" role="banner">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Flight Search</h1>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ucoban/flight-search-application"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-surface-container-high rounded-md transition-colors"
              aria-label="View source on GitHub"
            >
              <SVG src={githubIcon} className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 mb-4" role="main">
        {children}
      </main>
      <footer className="border-t mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Flight Search. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
