import { useState, useEffect } from 'react';
import type { TVSeries } from '../../types/tvSeries';
import { tmdbService } from '../../services/tmdbApi';

export const useTVSeries = () => {
  const [tvSeries, setTVSeries] = useState<TVSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularTVSeries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await tmdbService.getPopularTVSeries(1);
      setTVSeries(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar séries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularTVSeries();
  }, []);

  return {
    tvSeries,
    loading,
    error,
    fetchPopularTVSeries,
  };
};
