import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Play, Plus, Info } from 'lucide-react';
import type { TVSeries } from '../../types/tvSeries';
import { tmdbService } from '../../services/tmdbApi';
import './TVSeriesCard.css';

interface TVSeriesCardProps {
  tvSeries: TVSeries;
  className?: string;
}

const TVSeriesCard: React.FC<TVSeriesCardProps> = ({ tvSeries, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const navigate = useNavigate();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Reproduzir série:', tvSeries.name);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Adicionar à lista:', tvSeries.name);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    console.log('Toggle favorito:', tvSeries.name);
  };

  const handleViewDetails = () => {
    navigate(`/tv/${tvSeries.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleBackdropError = () => {
    setBackdropError(true);
  };

  const posterUrl = tmdbService.getImageUrl(tvSeries.poster_path, 'w500');
  const backdropUrl = tmdbService.getBackdropUrl(tvSeries.backdrop_path, 'w780');

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
    <div 
      className={`tv-series-card ${className} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-poster">
        {posterUrl && !imageError ? (
          <img 
            src={posterUrl} 
            alt={tvSeries.name}
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="poster-placeholder">
            <div className="placeholder-icon">📺</div>
            <span>{tvSeries.name}</span>
          </div>
        )}
        
        <div className="card-overlay">
          <div className="card-actions">
            <button 
              className="action-btn play-btn"
              onClick={handlePlay}
              title="Reproduzir"
            >
              <Play size={16} />
            </button>
            
            <button 
              className="action-btn add-btn"
              onClick={handleAddToList}
              title="Adicionar à lista"
            >
              <Plus size={16} />
            </button>
            
            <button 
              className="action-btn info-btn"
              onClick={handleViewDetails}
              title="Ver detalhes"
            >
              <Info size={16} />
            </button>
            
            <button 
              className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>

      {isHovered && (
        <div className="card-details">
          {backdropUrl && !backdropError ? (
            <div className="card-backdrop">
              <img 
                src={backdropUrl} 
                alt={tvSeries.name}
                onError={handleBackdropError}
              />
            </div>
          ) : (
            <div className="card-backdrop backdrop-placeholder">
              <div className="backdrop-placeholder-content">
                <div className="placeholder-icon">🎭</div>
                <span>{tvSeries.name}</span>
              </div>
            </div>
          )}
          
          <div className="card-info">
            <h3 className="card-title">{tvSeries.name}</h3>
            
            <div className="card-meta">
              <span className="card-year">
                {new Date(tvSeries.first_air_date).getFullYear()}
              </span>
              <span className="card-rating">
                {tvSeries.adult ? '18+' : 'L'}
              </span>
              <span className="card-language">
                {tvSeries.original_language.toUpperCase()}
              </span>
            </div>

            <div className="card-stars">
              {renderStars(tvSeries.vote_average)}
              <span className="rating-text">
                {tvSeries.vote_average.toFixed(1)}
              </span>
            </div>

            <p className="card-description">
              {tvSeries.overview.length > 120 
                ? `${tvSeries.overview.substring(0, 120)}...` 
                : tvSeries.overview
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TVSeriesCard;
