import React from 'react';
import TVSeriesBanner from '../components/TVSeriesBanner/TVSeriesBanner';
import TVSeriesCarousel from '../components/TVSeriesCarousel/TVSeriesCarousel';
import { useTVSeries } from '../hooks/useTVSeries';
import { useTVSeriesByGenre } from '../hooks/useTVSeriesByGenre';
import './TVSeriesPage.css';

// IDs dos gêneros de TV (TMDB)
const TV_GENRE_IDS = {
  ACTION: 10759,      // Action & Adventure
  COMEDY: 35,         // Comedy
  DRAMA: 18,          // Drama
  ANIMATION: 16,      // Animation
  SCIFI: 10765,       // Sci-Fi & Fantasy
  ROMANCE: 10749,     // Romance
  DOCUMENTARY: 99,    // Documentary
  CRIME: 80,          // Crime
  MYSTERY: 9648,      // Mystery
  FAMILY: 10751,      // Family
  REALITY: 10764,     // Reality
  NEWS: 10763,        // News
  TALK: 10767,        // Talk
  WAR: 10768,         // War & Politics
  WESTERN: 37,        // Western
};

const TVSeriesPage: React.FC = () => {
  const { tvSeries: popularTVSeries, loading: popularLoading } = useTVSeries();
  
  // Buscar séries por gênero
  const { tvSeries: actionTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.ACTION);
  const { tvSeries: comedyTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.COMEDY);
  const { tvSeries: dramaTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.DRAMA);
  const { tvSeries: animationTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.ANIMATION);
  const { tvSeries: scifiTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.SCIFI);
  const { tvSeries: romanceTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.ROMANCE);
  const { tvSeries: crimeTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.CRIME);
  const { tvSeries: mysteryTVSeries } = useTVSeriesByGenre(TV_GENRE_IDS.MYSTERY);

  if (popularLoading) {
    return (
      <div className="tv-series-page">
        {/* Carregando sem spinner */}
      </div>
    );
  }

  return (
    <div className="tv-series-page">
      {/* Banner com série em destaque */}
      <TVSeriesBanner tvSeries={popularTVSeries} />

      <div className="carousels-container">
        {/* Séries Populares */}
        <TVSeriesCarousel 
          title="🔥 Em Alta" 
          tvSeries={popularTVSeries} 
          loading={popularLoading} 
        />

        {/* Séries por Gênero */}
        <TVSeriesCarousel 
          title="⚡ Ação e Aventura" 
          tvSeries={actionTVSeries}
        />

        <TVSeriesCarousel 
          title="😂 Comédia" 
          tvSeries={comedyTVSeries}
        />

        <TVSeriesCarousel 
          title="🎭 Drama" 
          tvSeries={dramaTVSeries}
        />

        <TVSeriesCarousel 
          title="🎨 Animação" 
          tvSeries={animationTVSeries}
        />


        <TVSeriesCarousel 
          title="🔬 Ficção Científica" 
          tvSeries={scifiTVSeries}
        />

        <TVSeriesCarousel 
          title="💕 Romance" 
          tvSeries={romanceTVSeries}
        />

        <TVSeriesCarousel 
          title="🔍 Mistério" 
          tvSeries={mysteryTVSeries}
        />

        <TVSeriesCarousel 
          title="🚨 Crime" 
          tvSeries={crimeTVSeries}
        />
      </div>
    </div>
  );
};

export default TVSeriesPage;
