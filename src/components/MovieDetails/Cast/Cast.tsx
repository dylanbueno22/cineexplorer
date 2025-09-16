import React, { useState } from 'react';
import type { Cast as CastType } from '../../../types/movieDetails';
import { tmdbService } from '../../../services/tmdbApi';
import './Cast.css';

interface CastProps {
  cast: CastType[];
  className?: string;
}

const Cast: React.FC<CastProps> = ({ cast, className = '' }) => {
  // Limitar a 10 atores principais
  const mainCast = cast.slice(0, 10);

  return (
    <div className={`cast-container ${className}`}>
      <h3 className="cast-title">Elenco Principal</h3>
      <div className="cast-grid">
        {mainCast.map((actor, index) => (
          <CastItem key={`${actor.id}-${index}`} actor={actor} />
        ))}
      </div>
    </div>
  );
};

// Componente individual para cada ator com tratamento de erro de imagem
const CastItem: React.FC<{ actor: CastType }> = ({ actor }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const imageUrl = tmdbService.getImageUrl(actor.profile_path, 'w500');

  return (
    <div className="cast-item">
      <div className="cast-photo">
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="cast-loading">
                <div className="loading-spinner-small"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={actor.name}
              className={`cast-image ${imageLoading ? 'loading' : ''}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          <div className="cast-placeholder">
            <span className="cast-initials">
              {getInitials(actor.name)}
            </span>
          </div>
        )}
      </div>
      <div className="cast-info">
        <h4 className="cast-name">{actor.name}</h4>
        <p className="cast-character">{actor.character}</p>
      </div>
    </div>
  );
};

export default Cast;
