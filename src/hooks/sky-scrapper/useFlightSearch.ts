import { searchFlights } from "@/services/sky-scrapper";
import type { FlightSearchParams, Root } from "@/types/sky-scrapper";
import { useQuery } from "@tanstack/react-query";

interface UseFlightSearchProps extends FlightSearchParams {
  enabled?: boolean;
  onSuccess?: (data: Root) => void;
}

const useFlightSearch = (params: UseFlightSearchProps) => {
  const { enabled = false, limit = 10, ...searchParams } = params;

  const { data, error, isLoading, refetch, isFetched, isFetching } = useQuery<Root>({
    queryKey: ["flights", searchParams],
    queryFn: async () => {
      const updatedParams = {
        ...searchParams,
        date: searchParams.date.split("T")[0],
        returnDate: searchParams.returnDate?.split("T")[0],
        limit,
      };

      return searchFlights(updatedParams);
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    flights: data?.data.itineraries.slice(0, 10),
    error,
    isLoading,
    refetch,
    isFetched,
    isFetching,
  };
};

export default useFlightSearch;
