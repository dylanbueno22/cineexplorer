import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/movies';
import Cast from '../../components/MovieDetails/Cast/Cast';
import Crew from '../../components/MovieDetails/Crew/Crew';
import { tmdbService } from '../../services/tmdbApi';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import type { Genre, ProductionCompany, ProductionCountry, SpokenLanguage } from '../../types/movie';
import './MovieDetailsPage.css';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id, 10) : null;
  
  const { movieDetails, credits, loading, error } = useMovieDetails(movieId);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="loading-spinner"></div>
        <p>Carregando detalhes do filme...</p>
      </div>
    );
  }

  if (error || !movieDetails) {
    return (
      <div className="movie-details-error">
        <h2>Erro ao carregar filme</h2>
        <p>{error || 'Filme não encontrado'}</p>
        <button onClick={handleBackClick} className="back-button">
          <ArrowLeft size={20} />
          Voltar
        </button>
      </div>
    );
  }

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="movie-details-page">
      {/* Header com backdrop */}
      <div className="movie-header">
        {(() => {
          const backdropUrl = tmdbService.getBackdropUrl(movieDetails.backdrop_path, 'original');
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
                const posterUrl = tmdbService.getImageUrl(movieDetails.poster_path, 'w500');
                return posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movieDetails.title}
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
              <h1 className="movie-title">{movieDetails.title}</h1>
              {movieDetails.original_title !== movieDetails.title && (
                <h2 className="movie-original-title">{movieDetails.original_title}</h2>
              )}
              
              {movieDetails.tagline && (
                <p className="movie-tagline">"{movieDetails.tagline}"</p>
              )}
              
              <div className="movie-meta">
                <div className="movie-rating">
                  <Star size={20} className="star-icon" />
                  <span>{movieDetails.vote_average.toFixed(1)}</span>
                  <span className="rating-count">({movieDetails.vote_count} votos)</span>
                </div>
                
                <div className="movie-year">
                  <Calendar size={16} />
                  <span>{new Date(movieDetails.release_date).getFullYear()}</span>
                </div>
                
                {movieDetails.runtime > 0 && (
                  <div className="movie-runtime">
                    <Clock size={16} />
                    <span>{formatRuntime(movieDetails.runtime)}</span>
                  </div>
                )}
              </div>
              
              <div className="movie-genres">
                {movieDetails.genres.map((genre: Genre) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
              
              {movieDetails.overview && (
                <div className="movie-overview">
                  <h3>Sinopse</h3>
                  <p>{movieDetails.overview}</p>
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
              {movieDetails.status && (
                <div className="info-item">
                  <strong>Status:</strong>
                  <span>{movieDetails.status}</span>
                </div>
              )}
              
              {movieDetails.budget > 0 && (
                <div className="info-item">
                  <strong>Orçamento:</strong>
                  <span>{formatCurrency(movieDetails.budget)}</span>
                </div>
              )}
              
              {movieDetails.revenue > 0 && (
                <div className="info-item">
                  <strong>Receita:</strong>
                  <span>{formatCurrency(movieDetails.revenue)}</span>
                </div>
              )}
              
              {movieDetails.production_countries.length > 0 && (
                <div className="info-item">
                  <strong>País:</strong>
                  <span>{movieDetails.production_countries.map((c: ProductionCountry) => c.name).join(', ')}</span>
                </div>
              )}
              
              {movieDetails.spoken_languages.length > 0 && (
                <div className="info-item">
                  <strong>Idioma:</strong>
                  <span>{movieDetails.spoken_languages.map((l: SpokenLanguage) => l.english_name).join(', ')}</span>
                </div>
              )}
              
              {movieDetails.production_companies.length > 0 && (
                <div className="info-item">
                  <strong>Produção:</strong>
                  <span>{movieDetails.production_companies.map((c: ProductionCompany) => c.name).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
