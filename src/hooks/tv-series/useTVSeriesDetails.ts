import { useState, useEffect } from 'react';
import type { TVSeriesDetails, TVSeriesCredits } from '../../types/tvSeries';
import { tmdbService } from '../../services/tmdbApi';

export const useTVSeriesDetails = (tvSeriesId: number | null) => {
  const [tvSeriesDetails, setTVSeriesDetails] = useState<TVSeriesDetails | null>(null);
  const [credits, setCredits] = useState<TVSeriesCredits | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tvSeriesId) {
      setTVSeriesDetails(null);
      setCredits(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchTVSeriesDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const [details, creditsData] = await Promise.all([
          tmdbService.getTVSeriesDetails(tvSeriesId),
          tmdbService.getTVSeriesCredits(tvSeriesId)
        ]);
        
        setTVSeriesDetails(details);
        setCredits(creditsData);
      } catch (err) {
        console.error('Erro ao buscar detalhes da série:', err);
        setError('Erro ao carregar detalhes da série');
      } finally {
        setLoading(false);
      }
    };

    fetchTVSeriesDetails();
  }, [tvSeriesId]);

  return {
    tvSeriesDetails,
    credits,
    loading,
    error
  };
};
