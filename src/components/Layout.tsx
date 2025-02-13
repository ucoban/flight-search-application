import { ReactNode } from "react";
import { ThemeToggle } from "./ui/theme-toggle";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Flight Search</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4">{children}</main>
    </div>
  );
}
