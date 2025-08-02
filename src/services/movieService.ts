import axios from "axios";
import { type Movie } from "../types/movie";


const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjgxYWY4ZGRjOGU2NTg0M2NkZTU5MGE5YmE2OWMwNSIsIm5iZiI6MTc1NDEyNjg0Ni4wNDksInN1YiI6IjY4OGRkOWZlNzQzNTk0YmIxOGYzZGMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WM_vBCDn2Lya1iHbvDx5ajawREIRwfvJE2gWVAat4DE'
  },
});

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get<FetchMoviesResponse>("search/movie", {
    params: { query },
  });

  return response.data.results;
};