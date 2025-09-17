import { useState, useEffect } from 'react';
import type { Movie, MovieDetails } from '../../types/movie';
import { tmdbService } from '../../services/tmdbApi';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await tmdbService.getPopularMovies(1);
      setMovies(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar filmes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    fetchPopularMovies,
  };
};

export const useMovieDetails = (movieId: number | null) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieDetails = await tmdbService.getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar detalhes do filme');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return {
    movie,
    loading,
    error,
  };
};
