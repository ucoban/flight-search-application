import axios from "axios";

const api = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
  },
});

export const flightApi = {
  search: async (params: SearchParams) => {
    const response = await api.get("/search", { params });
    return response.data;
  },
};

interface SearchParams {
  from: string;
  to: string;
  date: string;
}

export type { SearchParams };
