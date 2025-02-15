import {
  AirportResponse,
  ConfigResponse,
  FlightSearchParams,
  LocaleResponse,
  NearbyAirportsResponse,
  PriceCalendarParams,
  PriceCalendarResponse,
  Root,
} from "@/types/sky-scrapper";
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

// Airport Endpoints
export const searchAirports = async (query: string): Promise<AirportResponse> => {
  const response = await api.get("/v1/flights/searchAirport", {
    params: { query },
  });
  return response.data;
};

export const getNearbyAirports = async (lat: number, lng: number): Promise<NearbyAirportsResponse> => {
  const response = await api.get("/v1/flights/getNearByAirports", {
    params: { lat, lng },
  });
  return response.data;
};

// Flight Search Endpoints
export const searchFlights = async (params: FlightSearchParams): Promise<Root> => {
  const response = await api.get("/v2/flights/searchFlights", {
    params,
  });
  return response.data;
};

export const getPriceCalendar = async (params: PriceCalendarParams): Promise<PriceCalendarResponse> => {
  const response = await api.get("/v1/flights/getPriceCalendar", {
    params,
  });
  return response.data;
};

// Config Endpoints
export const getConfig = async (): Promise<ConfigResponse> => {
  const response = await api.get("/v1/config");
  return response.data;
};

export const getLocale = async (): Promise<LocaleResponse> => {
  const response = await api.get("/v1/locale");
  return response.data;
};
