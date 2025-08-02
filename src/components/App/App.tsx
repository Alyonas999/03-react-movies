import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import MovieGrid from './MovieGrid/MovieGrid';
import Loader from './Loader/Loader';
import MovieModal from './MovieModal/MovieModal';
import { Toaster, toast } from 'react-hot-toast';
import type { Movie } from '../../../../types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=0681af8ddc8e65843cde590a9ba69c05`);
      const data = await res.json();
      if (!data.results.length) {
        toast.error('No movies found for your request.');
      }
      setMovies(data.results);
    } catch {
      toast.error('Error fetching movies.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />
      {isLoading ? (
        <Loader />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </>
  );
}