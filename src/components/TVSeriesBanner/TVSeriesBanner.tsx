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

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  return (
    <div className={`tv-series-banner ${className}`}>
      <div 
        className="banner-background"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, 0.1) 100%), url(${backdropUrl})`,
        }}
      >
        <div className="banner-overlay">
          {/* Conteúdo principal */}
          <div className="banner-content">
            <div className="banner-info">
              <h1 className="banner-title">
                <span className="title-main">{featuredSeries.name}</span>
                {featuredSeries.original_name !== featuredSeries.name && (
                  <span className="title-original">({featuredSeries.original_name})</span>
                )}
              </h1>
              
              <p className="banner-description">
                {featuredSeries.overview}
              </p>

              <div className="banner-movie-info">
                <div className="movie-meta">
                  <span className="featured-badge">⭐ DESTAQUE</span>
                  <span className="release-year">
                    {new Date(featuredSeries.first_air_date).getFullYear()}
                  </span>
                  <span className="movie-rating">
                    {featuredSeries.adult ? '18+' : 'Livre'}
                  </span>
                  <span className="movie-language">
                    {featuredSeries.original_language.toUpperCase()}
                  </span>
                </div>
                
                <div className="hero-rating">
                  <div className="stars">
                    {renderStars(featuredSeries.vote_average)}
                  </div>
                  <span className="rating-text">
                    {featuredSeries.vote_average.toFixed(1)}/10 ({featuredSeries.vote_count} votos)
                  </span>
                </div>
              </div>

              <div className="banner-actions">
                <button className="btn-watch-now" onClick={handlePlay}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Assistir Agora
                </button>
                <button className="btn-trailer" onClick={handleMoreInfo}>
                  Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVSeriesBanner;
