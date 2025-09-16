import React, { useState } from 'react';
import type { Crew as CrewType } from '../../../types/movieDetails';
import { tmdbService } from '../../../services/tmdbApi';
import './Crew.css';

interface CrewProps {
  crew: CrewType[];
  className?: string;
}

const Crew: React.FC<CrewProps> = ({ crew, className = '' }) => {
  // Filtrar apenas diretores e produtores principais
  const directors = crew.filter(person => 
    person.job === 'Director' || person.department === 'Directing'
  );
  
  const producers = crew.filter(person => 
    person.job === 'Producer' || person.department === 'Production'
  ).slice(0, 3); // Limitar a 3 produtores

  const writers = crew.filter(person => 
    person.job === 'Writer' || person.department === 'Writing'
  ).slice(0, 3); // Limitar a 3 roteiristas

  return (
    <div className={`crew-container ${className}`}>
      <h3 className="crew-title">Equipe Técnica</h3>
      
      {directors.length > 0 && (
        <div className="crew-section">
          <h4 className="crew-section-title">Direção</h4>
          <div className="crew-grid">
            {directors.map((director, index) => (
              <CrewItem key={`director-${director.id}-${index}`} person={director} />
            ))}
          </div>
        </div>
      )}

      {producers.length > 0 && (
        <div className="crew-section">
          <h4 className="crew-section-title">Produção</h4>
          <div className="crew-grid">
            {producers.map((producer, index) => (
              <CrewItem key={`producer-${producer.id}-${index}`} person={producer} />
            ))}
          </div>
        </div>
      )}

      {writers.length > 0 && (
        <div className="crew-section">
          <h4 className="crew-section-title">Roteiro</h4>
          <div className="crew-grid">
            {writers.map((writer, index) => (
              <CrewItem key={`writer-${writer.id}-${index}`} person={writer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente individual para cada membro da equipe com tratamento de erro de imagem
const CrewItem: React.FC<{ person: CrewType }> = ({ person }) => {
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

  const imageUrl = tmdbService.getImageUrl(person.profile_path, 'w500');

  return (
    <div className="crew-item">
      <div className="crew-photo">
        {imageUrl && !imageError ? (
          <>
            {imageLoading && (
              <div className="crew-loading">
                <div className="loading-spinner-small"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={person.name}
              className={`crew-image ${imageLoading ? 'loading' : ''}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          <div className="crew-placeholder">
            <span className="crew-initials">
              {getInitials(person.name)}
            </span>
          </div>
        )}
      </div>
      <div className="crew-info">
        <h5 className="crew-name">{person.name}</h5>
        <p className="crew-job">{person.job}</p>
      </div>
    </div>
  );
};

export default Crew;
