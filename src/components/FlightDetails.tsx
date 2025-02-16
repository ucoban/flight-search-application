import React from "react";
import type { Itinerary } from "@/types/sky-scrapper";

const FlightDetails: React.FC<{ flight: Itinerary }> = ({ flight }) => {
  const leg = flight.legs[0];
  const startTime = leg.departure
    ? new Date(leg.departure).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    : "N/A";
  const endTime = leg.arrival
    ? new Date(leg.arrival).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    : "N/A";
  const airlineName = leg.carriers.marketing[0].name || "N/A";

  return (
    <div>
      <div>{`${startTime} - ${endTime}`}</div>
      <div className="text-sm text-muted-foreground">{airlineName}</div>
    </div>
  );
};

export default FlightDetails;
