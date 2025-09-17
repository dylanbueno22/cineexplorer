import React, { useState, useMemo } from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/HeroBanner';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import { useMovies, useMoviesByGenre } from '../../hooks/movies';
import type { Movie } from '../../types/movie';
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
  const [searchQuery, setSearchQuery] = useState('');
  
  const { movies: popularMovies, loading: popularLoading } = useMovies();
  const { movies: actionMovies } = useMoviesByGenre(GENRE_IDS.ACTION);
  const { movies: comedyMovies } = useMoviesByGenre(GENRE_IDS.COMEDY);
  const { movies: dramaMovies } = useMoviesByGenre(GENRE_IDS.DRAMA);
  const { movies: animationMovies } = useMoviesByGenre(GENRE_IDS.ANIMATION);
  const { movies: thrillerMovies } = useMoviesByGenre(GENRE_IDS.THRILLER);
  const { movies: horrorMovies } = useMoviesByGenre(GENRE_IDS.HORROR);

  // Função para filtrar filmes por nome
  const filterMovies = (movies: Movie[], query: string) => {
    if (!query.trim()) return movies;
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.original_title?.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filtrar todos os filmes baseado na pesquisa
  const filteredPopularMovies = useMemo(() => filterMovies(popularMovies, searchQuery), [popularMovies, searchQuery]);
  const filteredActionMovies = useMemo(() => filterMovies(actionMovies, searchQuery), [actionMovies, searchQuery]);
  const filteredComedyMovies = useMemo(() => filterMovies(comedyMovies, searchQuery), [comedyMovies, searchQuery]);
  const filteredDramaMovies = useMemo(() => filterMovies(dramaMovies, searchQuery), [dramaMovies, searchQuery]);
  const filteredAnimationMovies = useMemo(() => filterMovies(animationMovies, searchQuery), [animationMovies, searchQuery]);
  const filteredThrillerMovies = useMemo(() => filterMovies(thrillerMovies, searchQuery), [thrillerMovies, searchQuery]);
  const filteredHorrorMovies = useMemo(() => filterMovies(horrorMovies, searchQuery), [horrorMovies, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (popularLoading) {
    return (
      <div className="movies-page">
        {/* Carregando sem spinner */}
      </div>
    );
  }

  return (
    <div className="movies-page">
      {/* Header com pesquisa */}
      <Header 
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        searchPlaceholder="Pesquisar filmes..."
      />
      
      {/* Hero Banner */}
      <HeroBanner />

      {/* Seções de Filmes */}
      <div className="movies-content">
        {/* Filmes Populares */}
        {filteredPopularMovies.length > 0 && (
          <MovieCarousel 
            title="🔥 Em Alta" 
            movies={filteredPopularMovies.slice(0, 20)} 
          />
        )}

        {/* Filmes por Gênero */}
        {filteredActionMovies.length > 0 && (
          <MovieCarousel 
            title="💥 Ação" 
            movies={filteredActionMovies.slice(0, 20)} 
          />
        )}

        {filteredComedyMovies.length > 0 && (
          <MovieCarousel 
            title="😂 Comédia" 
            movies={filteredComedyMovies.slice(0, 20)} 
          />
        )}

        {filteredDramaMovies.length > 0 && (
          <MovieCarousel 
            title="🎭 Drama" 
            movies={filteredDramaMovies.slice(0, 20)} 
          />
        )}

        {filteredAnimationMovies.length > 0 && (
          <MovieCarousel 
            title="🎨 Animação" 
            movies={filteredAnimationMovies.slice(0, 20)} 
          />
        )}

        {filteredThrillerMovies.length > 0 && (
          <MovieCarousel 
            title="😰 Suspense" 
            movies={filteredThrillerMovies.slice(0, 20)} 
          />
        )}

        {filteredHorrorMovies.length > 0 && (
          <MovieCarousel 
            title="👻 Terror" 
            movies={filteredHorrorMovies.slice(0, 20)} 
          />
        )}

        {/* Mostrar mensagem quando não há resultados */}
        {searchQuery && 
         filteredPopularMovies.length === 0 && 
         filteredActionMovies.length === 0 && 
         filteredComedyMovies.length === 0 && 
         filteredDramaMovies.length === 0 && 
         filteredAnimationMovies.length === 0 && 
         filteredThrillerMovies.length === 0 && 
         filteredHorrorMovies.length === 0 && (
          <div className="no-results">
            <h3>Nenhum filme encontrado para "{searchQuery}"</h3>
            <p>Tente pesquisar por outro termo.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MoviesPage;
