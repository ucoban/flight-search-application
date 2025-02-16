import React from "react";
import type { Itinerary } from "@/types/sky-scrapper";

const FlightDuration: React.FC<{ leg: Itinerary["legs"][0] }> = ({ leg }) => {
  const value = leg.durationInMinutes;
  const originCode = leg.origin.displayCode || "N/A";
  const destinationCode = leg.destination.displayCode || "N/A";

  return (
    <div>
      <div>{value ? `${Math.floor(value / 60)} hr ${value % 60} min` : "N/A"}</div>
      <div className="text-sm text-muted-foreground">{`${originCode}-${destinationCode}`}</div>
    </div>
  );
};

export default FlightDuration;
