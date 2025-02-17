import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Users } from "lucide-react";

interface Passengers {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

interface PassengerSelectProps {
  passengers: Passengers;
  onChange: (passengers: Passengers) => void;
}

const PASSENGER_OPTIONS = [
  { key: "adults", label: "Adults", subtext: "", min: 1, max: 9 },
  { key: "children", label: "Children", subtext: "Aged 2-11", min: 0, max: 8 },
  { key: "infantsInSeat", label: "Infants", subtext: "In seat", min: 0, max: 8 },
  { key: "infantsOnLap", label: "Infants", subtext: "On lap", min: 0, max: 8 },
];

export const PassengerSelect: React.FC<PassengerSelectProps> = ({ passengers, onChange }) => {
  const [open, setOpen] = useState(false);

  const totalPassengers = Object.values(passengers).reduce((a, b) => a + b, 0);
  const MAX_TOTAL_PASSENGERS = 9;

  const updatePassengers = (key: keyof Passengers, value: number) => {
    const newPassengers = {
      ...passengers,
      [key]: value,
    };
    const newTotal = Object.values(newPassengers).reduce((a, b) => a + b, 0);

    if (newTotal <= MAX_TOTAL_PASSENGERS) {
      onChange(newPassengers);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 md:h-10 w-[60px] md:w-[200px] px-2 md:px-3 justify-start">
          <Users className="mr-0 md:mr-2 h-4 w-4" />
          <span className="hidden md:inline">
            {totalPassengers} {totalPassengers === 1 ? "passenger" : "passengers"}
          </span>
          <span className="md:hidden">{totalPassengers}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] md:w-[320px] p-2">
        <div className="grid gap-4 p-2">
          {PASSENGER_OPTIONS.map(({ key, label, subtext, min, max }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{label}</span>
                {subtext && <span className="text-xs text-muted-foreground">{subtext}</span>}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    updatePassengers(key as keyof Passengers, Math.max(min, passengers[key as keyof Passengers] - 1))
                  }
                  disabled={passengers[key as keyof Passengers] <= min}
                >
                  <span className="text-lg">-</span>
                </Button>
                <span className="w-4 text-center">{passengers[key as keyof Passengers]}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    updatePassengers(key as keyof Passengers, Math.min(max, passengers[key as keyof Passengers] + 1))
                  }
                  disabled={passengers[key as keyof Passengers] >= max || totalPassengers >= MAX_TOTAL_PASSENGERS}
                >
                  <span className="text-lg">+</span>
                </Button>
              </div>
            </div>
          ))}
          {totalPassengers >= MAX_TOTAL_PASSENGERS && (
            <p className="text-xs text-destructive">Maximum {MAX_TOTAL_PASSENGERS} passengers allowed</p>
          )}
          <div className="flex justify-end gap-2 mt-2 pt-2 border-t">
            <Button
              variant="outline"
              onClick={() => onChange({ adults: 1, children: 0, infantsInSeat: 0, infantsOnLap: 0 })}
            >
              Reset
            </Button>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PassengerSelect;
