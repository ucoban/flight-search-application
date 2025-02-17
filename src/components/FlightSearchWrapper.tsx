import type { Itinerary } from "@/types/sky-scrapper";
import { useState } from "react";
import FlightListing from "./FlightListing";
import { FlightSearch } from "./FlightSearch";

const FlightSearchWrapper = () => {
  const [flights, setFlights] = useState<Itinerary[] | undefined>([]);
  const [isFetched, setIsFetched] = useState(false);

  return (
    <div className="flex flex-col gap-16">
      <FlightSearch onFlightsChange={setFlights} onFlightsFetched={setIsFetched} />
      <FlightListing flights={flights} isFetched={isFetched} />
    </div>
  );
};

export default FlightSearchWrapper;
