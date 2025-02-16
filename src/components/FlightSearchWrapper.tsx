import type { Itinerary } from "@/types/sky-scrapper";
import { useState } from "react";
import { FlightSearch } from "./FlightSearch";
import FlightListing from "./FlightListing";

const FlightSearchWrapper = () => {
  const [flights, setFlights] = useState<Itinerary[] | undefined>([]);

  return (
    <div className="flex flex-col gap-16">
      <FlightSearch setFlights={setFlights} />
      {flights && flights.length > 0 && <FlightListing flights={flights} />}
    </div>
  );
};

export default FlightSearchWrapper;
