import { cn } from "@/lib/utils";
import type { Airport } from "@/types/sky-scrapper";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";

interface AutocompleteProps {
  placeholder: string;
  value: Airport | undefined;
  onChange: (value: string) => void;
  suggestions: Airport[];
  loading: boolean;
  error: Error | null;
  onSelect: (airport: Airport) => void;
  inputClassName?: string;
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
  }, // Default value,
  onChange,
  suggestions,
  error,
  onSelect,
  inputClassName,
}) => {
  return (
    <Combobox onChange={onSelect} value={value} as="div" className="relative">
      <ComboboxInput
        autoComplete="off"
        placeholder={placeholder}
        displayValue={(airport: Airport | undefined) => airport?.presentation.suggestionTitle || ""}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-14 text-foreground bg-transparent border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-accent",
          inputClassName
        )}
      />
      {/* {loading && <p className="text-sm text-muted">Loading...</p>} */}
      {error && <p className="text-sm text-error">Error: {error.message}</p>}
      <ComboboxOptions className="absolute z-10 w-full bg-background shadow-md rounded-md mt-1 border border-muted">
        {suggestions.map((airport) => (
          <ComboboxOption
            key={airport.skyId}
            value={airport}
            as="div"
            className="p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <div className="font-medium text-foreground">{airport.presentation.suggestionTitle}</div>
            <div className="text-sm text-foreground/60">{airport.presentation.subtitle}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
};

export default Autocomplete;
