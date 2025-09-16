import React from 'react';
import type { TVSeries } from '../../types/tvSeries';
import { tmdbService } from '../../services/tmdbApi';
import './TVSeriesBanner.css';

interface TVSeriesBannerProps {
  tvSeries: TVSeries[];
  className?: string;
}

const TVSeriesBanner: React.FC<TVSeriesBannerProps> = ({ tvSeries, className = '' }) => {
  // Selecionar a série mais atrativa
  const selectMostAttractiveTVSeries = (seriesList: TVSeries[]): TVSeries => {
    const heroKeywords = [
      'stranger things', 'game of thrones', 'breaking bad', 'the walking dead',
      'house of cards', 'orange is the new black', 'narcos', 'ozark',
      'the crown', 'the witcher', 'mandalorian', 'loki', 'wandavision',
      'squid game', 'money heist', 'dark', 'the boys', 'euphoria',
      'bridgerton', 'lupin', 'queen\'s gambit', 'cobra kai',
      'hero', 'superhero', 'super', 'power', 'justice', 'league',
      'marvel', 'dc', 'netflix', 'hbo', 'disney', 'amazon'
    ];

    const currentYear = new Date().getFullYear();
    const recentYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

    const recentSeries = seriesList.filter(series => {
      const seriesYear = new Date(series.first_air_date).getFullYear();
      return recentYears.includes(seriesYear);
    });

    const candidates = recentSeries.length > 0 ? recentSeries : seriesList;

    const bestSeries = candidates.reduce((best, current) => {
      let bestScore = 0;
      let currentScore = 0;

      // Pontuação baseada em popularidade e rating
      bestScore += best.vote_count / 1000;
      bestScore += best.vote_average * 2;
      
      const bestName = best.name.toLowerCase();
      const bestOriginalName = best.original_name.toLowerCase();
      heroKeywords.forEach(keyword => {
        if (bestName.includes(keyword) || bestOriginalName.includes(keyword)) {
          bestScore += 10;
        }
      });

      currentScore += current.vote_count / 1000;
      currentScore += current.vote_average * 2;
      
      const currentName = current.name.toLowerCase();
      const currentOriginalName = current.original_name.toLowerCase();
      heroKeywords.forEach(keyword => {
        if (currentName.includes(keyword) || currentOriginalName.includes(keyword)) {
          currentScore += 10;
        }
      });

      return currentScore > bestScore ? current : best;
    });

    return bestSeries;
  };

  if (!tvSeries || tvSeries.length === 0) {
    return null;
  }

  const featuredSeries = selectMostAttractiveTVSeries(tvSeries);
  const backdropUrl = tmdbService.getBackdropUrl(featuredSeries.backdrop_path, 'original');

  const handlePlay = () => {
    console.log('Reproduzir série:', featuredSeries.name);
  };

  const handleMoreInfo = () => {
    console.log('Mais informações:', featuredSeries.name);
  };

  return (
    <div className={`tv-series-banner ${className}`}>
      <div className="banner-background">
        {backdropUrl && (
          <div 
            className="banner-image"
            style={{
              backgroundImage: `url(${backdropUrl})`
            }}
          />
        )}
        <div className="banner-overlay" />
      </div>

      <div className="banner-content">
        <div className="banner-info">
          <div className="featured-badge">
            ⭐ DESTAQUE
          </div>
          
          <h1 className="banner-title">{featuredSeries.name}</h1>
          
          {featuredSeries.original_name !== featuredSeries.name && (
            <h2 className="banner-original-title">{featuredSeries.original_name}</h2>
          )}

          <div className="banner-meta">
            <span className="banner-year">
              {new Date(featuredSeries.first_air_date).getFullYear()}
            </span>
            <span className="banner-rating">
              ⭐ {featuredSeries.vote_average.toFixed(1)}
            </span>
            <span className="banner-language">
              {featuredSeries.original_language.toUpperCase()}
            </span>
          </div>

          <p className="banner-description">
            {featuredSeries.overview.length > 200 
              ? `${featuredSeries.overview.substring(0, 200)}...` 
              : featuredSeries.overview
            }
          </p>

          <div className="banner-actions">
            <button className="btn-watch-now" onClick={handlePlay}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Assistir Agora
            </button>
            <button className="btn-trailer" onClick={handleMoreInfo}>
              Mais Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVSeriesBanner;
