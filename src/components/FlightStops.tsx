import React from "react";

const FlightStops: React.FC<{ stopCount: number }> = ({ stopCount }) => {
  return <div>{stopCount === 0 ? "Nonstop" : `${stopCount} stop${stopCount > 1 ? "s" : ""}`}</div>;
};

export default FlightStops;
