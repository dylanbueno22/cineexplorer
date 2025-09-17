import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTVSeriesDetails } from '../../hooks/tv-series/useTVSeriesDetails';
import Cast from '../../components/MovieDetails/Cast/Cast';
import Crew from '../../components/MovieDetails/Crew/Crew';
import { tmdbService } from '../../services/tmdbApi';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import type { Genre, ProductionCompany, ProductionCountry, SpokenLanguage } from '../../types/movie';
import './TVSeriesDetailsPage.css';

const TVSeriesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tvSeriesId = id ? parseInt(id, 10) : null;
  
  const { tvSeriesDetails, credits, loading, error } = useTVSeriesDetails(tvSeriesId);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="loading-spinner"></div>
        <p>Carregando detalhes da série...</p>
      </div>
    );
  }

  if (error || !tvSeriesDetails) {
    return (
      <div className="movie-details-error">
        <h2>Erro ao carregar série</h2>
        <p>{error || 'Série não encontrada'}</p>
        <button onClick={handleBackClick} className="back-button">
          <ArrowLeft size={20} />
          Voltar
        </button>
      </div>
    );
  }


  return (
    <div className="movie-details-page">
      {/* Header com backdrop */}
      <div className="movie-header">
        {(() => {
          const backdropUrl = tmdbService.getBackdropUrl(tvSeriesDetails.backdrop_path, 'original');
          return backdropUrl && (
            <div 
              className="movie-backdrop"
              style={{
                backgroundImage: `url(${backdropUrl})`
              }}
            />
          );
        })()}
        <div className="movie-backdrop-overlay" />
        
        <div className="movie-header-content">
          <button onClick={handleBackClick} className="back-button">
            <ArrowLeft size={20} />
            Voltar
          </button>
          
          <div className="movie-header-info">
            <div className="movie-poster">
              {(() => {
                const posterUrl = tmdbService.getImageUrl(tvSeriesDetails.poster_path, 'w500');
                return posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={tvSeriesDetails.name}
                    className="poster-image"
                  />
                ) : (
                  <div className="poster-placeholder">
                    <span>Sem poster</span>
                  </div>
                );
              })()}
            </div>
            
            <div className="movie-info">
              <h1 className="movie-title">{tvSeriesDetails.name}</h1>
              {tvSeriesDetails.original_name !== tvSeriesDetails.name && (
                <h2 className="movie-original-title">{tvSeriesDetails.original_name}</h2>
              )}
              
              {tvSeriesDetails.tagline && (
                <p className="movie-tagline">"{tvSeriesDetails.tagline}"</p>
              )}
              
              <div className="movie-meta">
                <div className="movie-rating">
                  <Star size={20} className="star-icon" />
                  <span>{tvSeriesDetails.vote_average.toFixed(1)}</span>
                  <span className="rating-count">({tvSeriesDetails.vote_count} votos)</span>
                </div>
                
                <div className="movie-year">
                  <Calendar size={16} />
                  <span>{new Date(tvSeriesDetails.first_air_date).getFullYear()}</span>
                </div>
                
                {tvSeriesDetails.number_of_seasons > 0 && (
                  <div className="movie-runtime">
                    <Clock size={16} />
                    <span>{tvSeriesDetails.number_of_seasons} temporada(s)</span>
                  </div>
                )}
              </div>
              
              <div className="movie-genres">
                {tvSeriesDetails.genres.map((genre: Genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
              
              {tvSeriesDetails.overview && (
                <div className="movie-overview">
                  <h3>Sinopse</h3>
                  <p>{tvSeriesDetails.overview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="movie-content">
        <div className="movie-content-container">
          {/* Elenco */}
          {credits?.cast && credits.cast.length > 0 && (
            <Cast cast={credits.cast} />
          )}
          
          {/* Equipe técnica */}
          {credits?.crew && credits.crew.length > 0 && (
            <Crew crew={credits.crew} />
          )}
          
          {/* Informações adicionais */}
          <div className="movie-additional-info">
            <h3 className="additional-info-title">Informações Adicionais</h3>
            
            <div className="info-grid">
              {tvSeriesDetails.status && (
                <div className="info-item">
                  <strong>Status:</strong>
                  <span>{tvSeriesDetails.status}</span>
                </div>
              )}
              
              {tvSeriesDetails.number_of_episodes > 0 && (
                <div className="info-item">
                  <strong>Episódios:</strong>
                  <span>{tvSeriesDetails.number_of_episodes}</span>
                </div>
              )}
              
              {tvSeriesDetails.number_of_seasons > 0 && (
                <div className="info-item">
                  <strong>Temporadas:</strong>
                  <span>{tvSeriesDetails.number_of_seasons}</span>
                </div>
              )}
              
              {tvSeriesDetails.production_countries.length > 0 && (
                <div className="info-item">
                  <strong>País:</strong>
                  <span>{tvSeriesDetails.production_countries.map((c: ProductionCountry) => c.name).join(', ')}</span>
                </div>
              )}
              
              {tvSeriesDetails.spoken_languages.length > 0 && (
                <div className="info-item">
                  <strong>Idioma:</strong>
                  <span>{tvSeriesDetails.spoken_languages.map((l: SpokenLanguage) => l.english_name).join(', ')}</span>
                </div>
              )}
              
              {tvSeriesDetails.production_companies.length > 0 && (
                <div className="info-item">
                  <strong>Produção:</strong>
                  <span>{tvSeriesDetails.production_companies.map((c: ProductionCompany) => c.name).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVSeriesDetailsPage;
