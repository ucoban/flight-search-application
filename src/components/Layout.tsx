import { ReactNode } from "react";
import { ThemeToggle } from "./ui/theme-toggle";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b" role="banner">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Flight Search</h1>
          <ThemeToggle />
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
