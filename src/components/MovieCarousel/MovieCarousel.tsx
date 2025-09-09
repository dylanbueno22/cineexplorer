import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import './MovieCarousel.css';

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  className?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ 
  title, 
  movies, 
  className = '' 
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = 300; // Quantidade de scroll
    const newPosition = direction === 'left' 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;

    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });

    setScrollPosition(newPosition);
    
    // Atualizar visibilidade das setas
    setTimeout(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    }, 300);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setScrollPosition(scrollLeft);
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className={`movie-carousel-section ${className}`}>
      <h2 className="carousel-title">{title}</h2>
      
      <div className="carousel-container">
        {showLeftArrow && (
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scroll('left')}
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div 
          className="carousel-content"
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {showRightArrow && (
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scroll('right')}
            aria-label="Rolar para direita"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCarousel;
