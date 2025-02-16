import { AirportResponse, FlightSearchParams, Root } from "@/types/sky-scrapper";
import axios from "axios";

const apiUrl = import.meta.env.VITE_SKY_SCRAPPER_API_URL;
const apiKey = import.meta.env.VITE_SKY_SCRAPPER_API_KEY;
const apiHost = import.meta.env.VITE_SKY_SCRAPPER_API_HOST;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
  },
});

// Add an interceptor to handle API response status
api.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (!data.status) {
      throw new Error(data.data.messages);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const searchAirports = async (query: string): Promise<AirportResponse> => {
  const response = await api.get("/v1/flights/searchAirport", {
    params: { query },
  });
  return response.data;
};

export const searchFlights = async (params: FlightSearchParams): Promise<Root> => {
  const response = await api.get("/v2/flights/searchFlights", {
    params,
  });
  return response.data;
};
