import { Input } from "@/components/ui/input";
import leftRight from "@/assets/left-right.svg";
import SVG from "react-inlinesvg";
import { DatePickerWithRange } from "./ui/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PassengerSelect } from "./PassengerSelect";
import { useState } from "react";
import { Button } from "./ui/button";
import circleIcon from "@/assets/circle-icon.svg";
import locationIcon from "@/assets/location-icon.svg";
import searchIcon from "@/assets/search-icon.svg";

type TripType = "round-trip" | "one-way" | "multi-city";
type ClassType = "economy" | "premium-economy" | "business" | "first";

interface Passengers {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

export function FlightSearch() {
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [classType, setClassType] = useState<ClassType>("economy");
  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Top Selectors */}
      <div className="flex items-center gap-4">
        <Select value={tripType} onValueChange={(value) => setTripType(value as TripType)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Trip type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="round-trip">Round trip</SelectItem>
            <SelectItem value="one-way">One way</SelectItem>
            <SelectItem value="multi-city">Multi-city</SelectItem>
          </SelectContent>
        </Select>

        <PassengerSelect passengers={passengers} onChange={setPassengers} />

        <Select value={classType} onValueChange={(value) => setClassType(value as ClassType)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="economy">Economy</SelectItem>
            <SelectItem value="premium-economy">Premium Economy</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="first">First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Existing Search Form */}
      <div className="relative p-7 shadow-sm flex gap-2 border rounded-md border-muted">
        <div className="flex flex-1 items-center gap-2 relative">
          <div className="relative flex-1">
            <SVG
              src={circleIcon}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground"
            />
            <Input type="text" placeholder="From?" className="pl-12" />
          </div>

          <button
            onClick={() => {}}
            className="absolute left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-background border border-input flex items-center justify-center hover:bg-accent hover:text-accent-foreground"
          >
            <SVG src={leftRight} className="w-5 h-5 text-foreground" />
          </button>

          <div className="relative flex-1">
            <SVG
              src={locationIcon}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground"
            />
            <Input type="text" placeholder="Where to?" className="pl-14" />
          </div>
        </div>

        <div className="flex min-w-[300px] items-center gap-2 relative">
          <DatePickerWithRange />
        </div>
        <Button
          size="lg"
          className="absolute rounded-full -bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center"
          variant="default"
        >
          <SVG src={searchIcon} className="w-5 h-5 mr-2 text-accent" />
          Search
        </Button>
      </div>
    </div>
  );
}
