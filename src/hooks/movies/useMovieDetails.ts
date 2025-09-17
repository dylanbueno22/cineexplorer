import { useState, useEffect } from 'react';
import type { MovieDetailsExtended, MovieCredits } from '../../types/movieDetails';
import { tmdbService } from '../../services/tmdbApi';

export const useMovieDetails = (movieId: number | null) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsExtended | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar detalhes e créditos em paralelo
      const [details, movieCredits] = await Promise.all([
        tmdbService.getMovieDetailsExtended(id),
        tmdbService.getMovieCredits(id)
      ]);
      
      setMovieDetails(details);
      setCredits(movieCredits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar detalhes do filme');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId);
    } else {
      setMovieDetails(null);
      setCredits(null);
      setError(null);
    }
  }, [movieId]);

  return {
    movieDetails,
    credits,
    loading,
    error,
    refetch: () => movieId && fetchMovieDetails(movieId)
  };
};
