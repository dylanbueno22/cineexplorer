import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Info } from 'lucide-react';
import type { Movie } from '../../types/movie';
import { tmdbService } from '../../services/tmdbApi';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [backdropError, setBackdropError] = useState(false);
  const navigate = useNavigate();
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique no botão acione a navegação
    console.log('Reproduzir filme:', movie.title);
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique no botão acione a navegação
    console.log('Adicionar à lista:', movie.title);
  };

  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleBackdropError = () => {
    setBackdropError(true);
  };

  const posterUrl = tmdbService.getImageUrl(movie.poster_path, 'w500');
  const backdropUrl = tmdbService.getBackdropUrl(movie.backdrop_path, 'w780');

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
      className={`movie-card ${className} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-poster">
        {posterUrl && !imageError ? (
          <img 
            src={posterUrl} 
            alt={movie.title}
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className="poster-placeholder">
            <div className="placeholder-icon">🎬</div>
            <span>{movie.title}</span>
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
          </div>
        </div>
      </div>

      {isHovered && (
        <div className="card-details">
          {backdropUrl && !backdropError ? (
            <div className="card-backdrop">
              <img 
                src={backdropUrl} 
                alt={movie.title}
                onError={handleBackdropError}
              />
            </div>
          ) : (
            <div className="card-backdrop backdrop-placeholder">
              <div className="backdrop-placeholder-content">
                <div className="placeholder-icon">🎭</div>
                <span>{movie.title}</span>
              </div>
            </div>
          )}
          
          <div className="card-info">
            <h3 className="card-title">{movie.title}</h3>
            
            <div className="card-meta">
              <span className="card-year">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="card-rating">
                {movie.adult ? '18+' : 'L'}
              </span>
              <span className="card-language">
                {movie.original_language.toUpperCase()}
              </span>
            </div>

            <div className="card-stars">
              {renderStars(movie.vote_average)}
              <span className="rating-text">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <p className="card-description">
              {movie.overview.length > 120 
                ? `${movie.overview.substring(0, 120)}...` 
                : movie.overview
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
