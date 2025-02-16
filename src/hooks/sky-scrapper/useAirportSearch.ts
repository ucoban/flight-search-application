import { searchAirports } from "@/services/sky-scrapper";
import type { Airport } from "@/types/sky-scrapper";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseAirportSearchProps {
  query: string;
  enabled?: boolean;
  minQueryLength?: number;
}

const useAirportSearch = ({ query, enabled = true, minQueryLength = 2 }: UseAirportSearchProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data, error, isLoading, isFetched } = useQuery({
    queryKey: ["airports", debouncedQuery],
    queryFn: () => searchAirports(debouncedQuery),
    enabled: enabled && !!debouncedQuery && debouncedQuery.length >= minQueryLength,
    select: (response) => response.data,
  });

  return {
    airports: data as Airport[] | undefined,
    error,
    isLoading,
    isFetched,
  };
};

export default useAirportSearch;
