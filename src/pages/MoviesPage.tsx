import React from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieCarousel from '../components/MovieCarousel/MovieCarousel';
import { useMovies } from '../hooks/useMovies';
import { useMoviesByGenre } from '../hooks/useMoviesByGenre';
import './MoviesPage.css';

// IDs dos gêneros no TMDB
const GENRE_IDS = {
  ACTION: 28,
  COMEDY: 35,
  DRAMA: 18,
  ANIMATION: 16,
  THRILLER: 53,
  HORROR: 27,
  SCIENCE_FICTION: 878,
  FANTASY: 14,
  ROMANCE: 10749,
  ADVENTURE: 12,
};

const MoviesPage: React.FC = () => {
  const { movies: popularMovies, loading: popularLoading } = useMovies();
  const { movies: actionMovies, loading: actionLoading } = useMoviesByGenre(GENRE_IDS.ACTION);
  const { movies: comedyMovies, loading: comedyLoading } = useMoviesByGenre(GENRE_IDS.COMEDY);
  const { movies: dramaMovies, loading: dramaLoading } = useMoviesByGenre(GENRE_IDS.DRAMA);
  const { movies: animationMovies, loading: animationLoading } = useMoviesByGenre(GENRE_IDS.ANIMATION);
  const { movies: thrillerMovies, loading: thrillerLoading } = useMoviesByGenre(GENRE_IDS.THRILLER);
  const { movies: horrorMovies, loading: horrorLoading } = useMoviesByGenre(GENRE_IDS.HORROR);

  if (popularLoading) {
    return (
      <div className="movies-page loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando filmes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-page">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Seções de Filmes */}
      <div className="movies-content">
        {/* Em Alta */}
        {popularMovies.length > 0 && (
          <MovieCarousel 
            title="🔥 Em Alta" 
            movies={popularMovies.slice(0, 20)} 
          />
        )}

        {/* Ação */}
        {actionMovies.length > 0 && (
          <MovieCarousel 
            title="💥 Ação" 
            movies={actionMovies.slice(0, 20)} 
          />
        )}

        {/* Comédia */}
        {comedyMovies.length > 0 && (
          <MovieCarousel 
            title="😂 Comédia" 
            movies={comedyMovies.slice(0, 20)} 
          />
        )}

        {/* Drama */}
        {dramaMovies.length > 0 && (
          <MovieCarousel 
            title="🎭 Drama" 
            movies={dramaMovies.slice(0, 20)} 
          />
        )}

        {/* Animação */}
        {animationMovies.length > 0 && (
          <MovieCarousel 
            title="🎨 Animação" 
            movies={animationMovies.slice(0, 20)} 
          />
        )}

        {/* Suspense */}
        {thrillerMovies.length > 0 && (
          <MovieCarousel 
            title="😱 Suspense" 
            movies={thrillerMovies.slice(0, 20)} 
          />
        )}

        {/* Terror */}
        {horrorMovies.length > 0 && (
          <MovieCarousel 
            title="👻 Terror" 
            movies={horrorMovies.slice(0, 20)} 
          />
        )}
      </div>
    </div>
  );
};

export default MoviesPage;
