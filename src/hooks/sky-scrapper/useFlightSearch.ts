import { searchFlights } from "@/services/sky-scrapper";
import type { FlightSearchParams, Root } from "@/types/sky-scrapper";
import { useQuery } from "@tanstack/react-query";

interface UseFlightSearchProps extends FlightSearchParams {
  enabled?: boolean;
  onSuccess?: (data: Root) => void;
}

const useFlightSearch = (params: UseFlightSearchProps) => {
  const { enabled = true, ...searchParams } = params;

  const { data, error, isLoading, refetch } = useQuery<Root>({
    queryKey: ["flights", searchParams],
    queryFn: async () => {
      const updatedParams = {
        ...searchParams,
        date: searchParams.date.split("T")[0],
        returnDate: searchParams.returnDate?.split("T")[0],
      };

      return searchFlights(updatedParams);
    },
    enabled: enabled,
    staleTime: 1000 * 60 * 2,
  });

  return {
    flights: data?.data.itineraries,
    error,
    isLoading,
    refetch,
  };
};

export default useFlightSearch;
