import { FlightSearch } from "@/components/FlightSearch";
import { Hero } from "@/components/Hero";

export function Flights() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="w-full max-w-4xl px-4">
        <FlightSearch />
      </div>
    </div>
  );
}
