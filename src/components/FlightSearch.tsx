import circleIcon from "@/assets/circle-icon.svg";
import leftRight from "@/assets/left-right.svg";
import locationIcon from "@/assets/location-icon.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAirportSearch, useFlightSearch } from "@/hooks/sky-scrapper";
import type { Airport, Itinerary } from "@/types/sky-scrapper";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { PassengerSelect } from "./PassengerSelect";
import Autocomplete from "./ui/Autocomplete";
import { Button } from "./ui/button";
import { DatePickerWithRange } from "./ui/date-range-picker";
import Spinner from "./ui/Spinner";

type TripType = "round-trip" | "one-way" | "multi-city";
type ClassType = "economy" | "premium-economy" | "business" | "first";

interface Passengers {
  adults: number;
  children: number;
  infantsInSeat: number;
  infantsOnLap: number;
}

interface FlightSearchProps {
  setFlights: (itinerary: Itinerary[] | undefined) => void;
}

export const FlightSearch = ({ setFlights }: FlightSearchProps) => {
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [classType, setClassType] = useState<ClassType>("economy");
  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [origin, setOrigin] = useState<Airport | undefined>();
  const [destination, setDestination] = useState<Airport | undefined>();
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string | undefined>(undefined);

  const {
    airports: originAirports,
    error: originError,
    isLoading: originLoading,
  } = useAirportSearch({ query: originQuery });
  const {
    airports: destinationAirports,
    error: destinationError,
    isLoading: destinationLoading,
  } = useAirportSearch({ query: destinationQuery });

  const {
    flights,
    isLoading,
    refetch: refetchFlights,
  } = useFlightSearch({
    date: departureDate,
    returnDate,
    adults: passengers.adults,
    children: passengers.children,
    infantsInSeat: passengers.infantsInSeat,
    infantsOnLap: passengers.infantsOnLap,
    cabinClass: classType,
    enabled: false,
    destinationEntityId: destination?.entityId || "",
    destinationSkyId: destination?.skyId || "",
    originEntityId: origin?.entityId || "",
    originSkyId: origin?.skyId || "",
  });

  const isDisabled = !origin || !destination || !departureDate || isLoading;

  const handleSearch = () => {
    if (origin && destination && departureDate) {
      refetchFlights();
    }
  };

  useEffect(() => {
    if (flights && setFlights) {
      setFlights(flights);
    }
  }, [flights, setFlights]);

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
            <Autocomplete
              placeholder="From?"
              value={origin}
              onChange={setOriginQuery}
              suggestions={originAirports || []}
              loading={originLoading}
              error={originError}
              inputClassName="pl-12"
              onSelect={(airport) => setOrigin(airport)}
            />
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
            <Autocomplete
              placeholder="Where to?"
              value={destination}
              onChange={setDestinationQuery}
              suggestions={destinationAirports || []}
              loading={destinationLoading}
              error={destinationError}
              onSelect={(airport) => setDestination(airport)}
              inputClassName="pl-12"
            />
          </div>
        </div>

        <div className="flex min-w-[300px] items-center gap-2 relative">
          <DatePickerWithRange
            onChange={(dates) => {
              const { startDate, endDate } = dates;
              setDepartureDate(startDate.toISOString());
              setReturnDate(endDate?.toISOString());
            }}
          />
        </div>
        <Button
          size="lg"
          className="disabled:bg-muted disabled:opacity-100 absolute rounded-full -bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center"
          variant="default"
          onClick={handleSearch}
          disabled={isDisabled}
        >
          {isLoading ? <Spinner className="mr-2" /> : null}
          Search
        </Button>
      </div>
    </div>
  );
};
