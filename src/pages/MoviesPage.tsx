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
  CRIME: 80,
  MYSTERY: 9648,
  FAMILY: 10751,
  DOCUMENTARY: 99,
  WAR: 10752,
  WESTERN: 37,
};

const MoviesPage: React.FC = () => {
  const { movies: popularMovies, loading: popularLoading } = useMovies();
  const { movies: actionMovies } = useMoviesByGenre(GENRE_IDS.ACTION);
  const { movies: comedyMovies } = useMoviesByGenre(GENRE_IDS.COMEDY);
  const { movies: dramaMovies } = useMoviesByGenre(GENRE_IDS.DRAMA);
  const { movies: animationMovies } = useMoviesByGenre(GENRE_IDS.ANIMATION);
  const { movies: thrillerMovies } = useMoviesByGenre(GENRE_IDS.THRILLER);
  const { movies: horrorMovies } = useMoviesByGenre(GENRE_IDS.HORROR);

  if (popularLoading) {
    return (
      <div className="movies-page">
        {/* Carregando sem spinner */}
      </div>
    );
  }

  return (
    <div className="movies-page">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Seções de Filmes */}
      <div className="movies-content">
        {/* Filmes Populares */}
        {popularMovies.length > 0 && (
          <MovieCarousel 
            title="🔥 Em Alta" 
            movies={popularMovies.slice(0, 20)} 
          />
        )}

        {/* Filmes por Gênero */}
        {actionMovies.length > 0 && (
          <MovieCarousel 
            title="💥 Ação" 
            movies={actionMovies.slice(0, 20)} 
          />
        )}

        {comedyMovies.length > 0 && (
          <MovieCarousel 
            title="😂 Comédia" 
            movies={comedyMovies.slice(0, 20)} 
          />
        )}

        {dramaMovies.length > 0 && (
          <MovieCarousel 
            title="🎭 Drama" 
            movies={dramaMovies.slice(0, 20)} 
          />
        )}

        {animationMovies.length > 0 && (
          <MovieCarousel 
            title="🎨 Animação" 
            movies={animationMovies.slice(0, 20)} 
          />
        )}

        {thrillerMovies.length > 0 && (
          <MovieCarousel 
            title="😰 Suspense" 
            movies={thrillerMovies.slice(0, 20)} 
          />
        )}

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
