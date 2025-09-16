import { useState, useEffect, useCallback } from 'react';
import type { TVSeries } from '../types/tvSeries';
import { tmdbService } from '../services/tmdbApi';

export const useTVSeriesByGenre = (genreId: number) => {
  const [tvSeries, setTVSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTVSeries = useCallback(async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tmdbService.getTVSeriesByGenre(genreId, pageNumber);
      setTVSeries(prevTVSeries => [...prevTVSeries, ...response.results]);
      setHasMore(response.page < response.total_pages);
      setPage(pageNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar séries por gênero');
    } finally {
      setLoading(false);
    }
  }, [genreId]);

  useEffect(() => {
    setTVSeries([]); // Reset series when genreId changes
    setPage(1);
    setHasMore(true);
    fetchTVSeries(1);
  }, [genreId, fetchTVSeries]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchTVSeries(page + 1);
    }
  }, [hasMore, loading, page, fetchTVSeries]);

  return { tvSeries, loading, error, loadMore, hasMore };
};
