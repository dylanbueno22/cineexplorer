import { useState, useEffect } from 'react';
import type { Movie } from '../../types/movie';
import { tmdbService } from '../../services/tmdbApi';

interface UseMoviesByGenreResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const useMoviesByGenre = (genreId: number): UseMoviesByGenreResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await tmdbService.getMoviesByGenre(genreId);
        setMovies(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar filmes');
        console.error('Erro ao buscar filmes por gênero:', err);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchMoviesByGenre();
    }
  }, [genreId]);

  return { movies, loading, error };
};
