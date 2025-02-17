import FlightSearchWrapper from "@/components/FlightSearchWrapper";
import { Hero } from "@/components/Hero";

const Flights = () => {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="w-full max-w-4xl px-4">
        <FlightSearchWrapper />
      </div>
    </div>
  );
};

export default Flights;
