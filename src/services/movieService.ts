import axios from 'axios';
import type { Movie } from "../types/movie";
import axios from 'axios';

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await tmdbApi.get<FetchMoviesResponse>('search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en',
      page: 1,
    },
  });

  return response.data.results;
};
