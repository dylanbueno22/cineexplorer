import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TVSeries } from '../../types/tvSeries';
import TVSeriesCard from '../TVSeriesCard/TVSeriesCard';
import './TVSeriesCarousel.css';

interface TVSeriesCarouselProps {
  title: string;
  tvSeries: TVSeries[];
  loading?: boolean;
  error?: string | null;
  genreId?: number;
  className?: string;
}

const TVSeriesCarousel: React.FC<TVSeriesCarouselProps> = ({
  title,
  tvSeries,
  loading = false,
  error = null,
  className = ''
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, [tvSeries]);

  if (loading) {
    return (
      <div className={`tv-series-carousel ${className}`}>
        <h3 className="carousel-title">{title}</h3>
        <div className="carousel-loading">
          <div className="loading-spinner"></div>
          <p>Carregando séries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`tv-series-carousel ${className}`}>
        <h3 className="carousel-title">{title}</h3>
        <div className="carousel-error">
          <p>Erro ao carregar séries: {error}</p>
        </div>
      </div>
    );
  }

  if (!tvSeries || tvSeries.length === 0) {
    return (
      <div className={`tv-series-carousel ${className}`}>
        <h3 className="carousel-title">{title}</h3>
        <div className="carousel-empty">
          <p>Nenhuma série encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`tv-series-carousel ${className}`}>
      <h3 className="carousel-title">{title}</h3>
      
      <div className="carousel-container">
        {canScrollLeft && (
          <button 
            className="carousel-nav-btn carousel-nav-left"
            onClick={scrollLeft}
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        <div 
          className="carousel-scroll-container"
          ref={scrollContainerRef}
        >
          <div className="carousel-content">
            {tvSeries.map((series, index) => (
              <TVSeriesCard 
                key={`${series.id}-${index}`}
                tvSeries={series}
                className="carousel-item"
              />
            ))}
          </div>
        </div>
        
        {canScrollRight && (
          <button 
            className="carousel-nav-btn carousel-nav-right"
            onClick={scrollRight}
            aria-label="Rolar para a direita"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TVSeriesCarousel;
