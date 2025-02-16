import { cn } from "@/lib/utils";
import type { Airport } from "@/types/sky-scrapper";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { AlertCircle } from "lucide-react";

const LoadingSkeleton = () => (
  <>
    {[...Array(3)].map((_, i) => (
      <div key={i} className="p-2 animate-pulse">
        <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-1/2 opacity-70"></div>
      </div>
    ))}
  </>
);

const NoResults = ({ query }: { query: string }) => (
  <div className="p-6 text-center text-muted-foreground">
    <p className="font-medium mb-1">No airports found</p>
    <p className="text-sm text-muted-foreground/70">
      No results for "{query}". Try checking for typos or using a different term.
    </p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="p-6 text-center text-destructive">
    <AlertCircle className="w-12 h-12 mx-auto mb-4 stroke-destructive/70" />
    <p className="font-medium mb-1">Error occurred</p>
    <p className="text-sm text-destructive/70">{message}</p>
  </div>
);

interface AutocompleteProps {
  placeholder: string;
  value: Airport | undefined;
  onChange: (value: string) => void;
  suggestions: Airport[];
  loading: boolean;
  error: Error | null;
  onSelect: (airport: Airport) => void;
  inputClassName?: string;
  query: string;
  isFetched?: boolean;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder,
  value = {
    skyId: "",
    entityId: "",
    presentation: { title: "", suggestionTitle: "", subtitle: "" },
    navigation: {
      entityId: "",
      entityType: "",
      localizedName: "",
      relevantFlightParams: { skyId: "", entityId: "", flightPlaceType: "", localizedName: "" },
      relevantHotelParams: { entityId: "", entityType: "", localizedName: "" },
    },
  },
  onChange,
  suggestions,
  loading,
  error,
  onSelect,
  inputClassName,
  query,
  isFetched,
}) => {
  return (
    <Combobox onChange={onSelect} value={value} as="div" className="relative">
      <ComboboxInput
        autoComplete="off"
        placeholder={placeholder}
        displayValue={() => value?.presentation.suggestionTitle || query}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-14 text-foreground bg-transparent border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent",
          inputClassName
        )}
      />
      {(loading || error || (isFetched && suggestions)) && (
        <ComboboxOptions className="absolute z-10 w-full bg-background shadow-md rounded-md mt-1 border border-muted max-h-[300px] overflow-auto">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState message={error.message} />
          ) : suggestions.length === 0 ? (
            <NoResults query={query} />
          ) : (
            suggestions.map((airport) => (
              <ComboboxOption
                key={airport.skyId}
                value={airport}
                className={({ focus }) =>
                  cn("p-2 cursor-pointer", focus ? "bg-accent text-accent-foreground" : "text-foreground")
                }
              >
                {({ selected, focus }) => (
                  <div>
                    <div className={cn("font-medium", selected && "font-semibold")}>
                      {airport.presentation.suggestionTitle}
                    </div>
                    <div className={cn("text-sm", focus ? "text-accent-foreground/80" : "text-foreground/60")}>
                      {airport.presentation.subtitle}
                    </div>
                  </div>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      )}
    </Combobox>
  );
};

export default Autocomplete;
