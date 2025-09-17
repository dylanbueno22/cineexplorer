import React, { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { tmdbService } from '../services/tmdbApi';
import { useMovies } from '../hooks/movies';
import './HeroBanner.css';

interface HeroBannerProps {
  className?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ className = '' }) => {
  const { movies, loading, error } = useMovies();
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  const handleWatchNow = () => {
    // Implementar lógica para assistir o filme
    console.log('Assistir filme:', featuredMovie?.title);
  };

  const handleWatchTrailer = () => {
    // Implementar lógica para assistir trailer
    console.log('Assistir trailer:', featuredMovie?.title);
  };

  useEffect(() => {
    if (movies.length > 0) {
      // Selecionar o filme mais chamativo baseado em critérios
      const featuredMovie = selectMostAttractiveMovie(movies);
      setFeaturedMovie(featuredMovie);
    }
  }, [movies]);

  const selectMostAttractiveMovie = (movieList: Movie[]): Movie => {
    // Critérios para selecionar o filme mais chamativo:
    // 1. Alta popularidade (vote_count)
    // 2. Boa avaliação (vote_average)
    // 3. Títulos que contenham palavras-chave de heróis/ação
    // 4. Filmes recentes (últimos 5 anos)
    
    const heroKeywords = [
      'avengers', 'spider', 'batman', 'superman', 'iron man', 'thor', 'captain',
      'wonder woman', 'black panther', 'guardians', 'x-men', 'deadpool',
      'hero', 'heroes', 'super', 'power', 'justice', 'league', 'squad',
      'fast', 'furious', 'mission impossible', 'bond', 'john wick',
      'transformers', 'terminator', 'predator', 'alien', 'matrix'
    ];

    const currentYear = new Date().getFullYear();
    const recentYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

    // Filtrar filmes recentes
    const recentMovies = movieList.filter(movie => {
      const movieYear = new Date(movie.release_date).getFullYear();
      return recentYears.includes(movieYear);
    });

    // Se não houver filmes recentes, usar todos
    const candidates = recentMovies.length > 0 ? recentMovies : movieList;

    // Encontrar o melhor filme baseado nos critérios
    const bestMovie = candidates.reduce((best, current) => {
      let bestScore = 0;
      let currentScore = 0;

      // Calcular score do melhor filme atual
      bestScore += best.vote_count / 1000; // Popularidade
      bestScore += best.vote_average * 2; // Avaliação
      
      // Bonus por palavras-chave de heróis
      const bestTitle = best.title.toLowerCase();
      const bestOriginalTitle = best.original_title.toLowerCase();
      heroKeywords.forEach(keyword => {
        if (bestTitle.includes(keyword) || bestOriginalTitle.includes(keyword)) {
          bestScore += 10;
        }
      });

      // Calcular score do filme atual
      currentScore += current.vote_count / 1000; // Popularidade
      currentScore += current.vote_average * 2; // Avaliação
      
      // Bonus por palavras-chave de heróis
      const currentTitle = current.title.toLowerCase();
      const currentOriginalTitle = current.original_title.toLowerCase();
      heroKeywords.forEach(keyword => {
        if (currentTitle.includes(keyword) || currentOriginalTitle.includes(keyword)) {
          currentScore += 10;
        }
      });

      return currentScore > bestScore ? current : best;
    });

    return bestMovie;
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

  if (loading) {
    return (
      <div className={`hero-banner ${className}`}>
        {/* Carregando sem spinner */}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`hero-banner error ${className}`}>
        <div className="error-message">
          <h2>Erro ao carregar filmes</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!featuredMovie) {
    return (
      <div className={`hero-banner no-movie ${className}`}>
        <div className="no-movie-message">
          <h2>Nenhum filme encontrado</h2>
        </div>
      </div>
    );
  }

  const backdropUrl = tmdbService.getBackdropUrl(featuredMovie.backdrop_path, 'original');

  return (
    <div className={`hero-banner ${className}`}>
      <div 
        className="hero-background"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, 0.1) 100%), url(${backdropUrl})`,
        }}
      >
        <div className="hero-overlay">

          {/* Conteúdo principal */}
          <div className="hero-content">
            <div className="hero-info">
              <h1 className="hero-title">
                <span className="title-main">{featuredMovie.title}</span>
                {featuredMovie.original_title !== featuredMovie.title && (
                  <span className="title-original">({featuredMovie.original_title})</span>
                )}
              </h1>
              
              <p className="hero-description">
                {featuredMovie.overview}
              </p>

              <div className="hero-movie-info">
                <div className="movie-meta">
                  <span className="featured-badge">⭐ DESTAQUE</span>
                  <span className="release-year">
                    {new Date(featuredMovie.release_date).getFullYear()}
                  </span>
                  <span className="movie-rating">
                    {featuredMovie.adult ? '18+' : 'Livre'}
                  </span>
                  <span className="movie-language">
                    {featuredMovie.original_language.toUpperCase()}
                  </span>
                </div>
                
                <div className="hero-rating">
                  <div className="stars">
                    {renderStars(featuredMovie.vote_average)}
                  </div>
                  <span className="rating-text">
                    {featuredMovie.vote_average.toFixed(1)}/10 ({featuredMovie.vote_count} votos)
                  </span>
                </div>
              </div>

              <div className="hero-actions">
                <button className="btn-watch-now" onClick={handleWatchNow}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Assistir Agora
                </button>
                <button className="btn-trailer" onClick={handleWatchTrailer}>
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

export default HeroBanner;
