import React, { useState, useMemo } from 'react';
import Header from '../../components/Header/Header';
import TVSeriesBanner from '../../components/TVSeriesBanner/TVSeriesBanner';
import TVSeriesCarousel from '../../components/TVSeriesCarousel/TVSeriesCarousel';
import { useTVSeries, useTVSeriesByGenre } from '../../hooks/tv-series';
import type { TVSeries } from '../../types/tvSeries';
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
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Função para filtrar séries por nome
  const filterTVSeries = (tvSeries: TVSeries[], query: string) => {
    if (!query.trim()) return tvSeries;
    return tvSeries.filter(series => 
      series.name.toLowerCase().includes(query.toLowerCase()) ||
      series.original_name?.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Filtrar todas as séries baseado na pesquisa
  const filteredPopularTVSeries = useMemo(() => filterTVSeries(popularTVSeries, searchQuery), [popularTVSeries, searchQuery]);
  const filteredActionTVSeries = useMemo(() => filterTVSeries(actionTVSeries, searchQuery), [actionTVSeries, searchQuery]);
  const filteredComedyTVSeries = useMemo(() => filterTVSeries(comedyTVSeries, searchQuery), [comedyTVSeries, searchQuery]);
  const filteredDramaTVSeries = useMemo(() => filterTVSeries(dramaTVSeries, searchQuery), [dramaTVSeries, searchQuery]);
  const filteredAnimationTVSeries = useMemo(() => filterTVSeries(animationTVSeries, searchQuery), [animationTVSeries, searchQuery]);
  const filteredScifiTVSeries = useMemo(() => filterTVSeries(scifiTVSeries, searchQuery), [scifiTVSeries, searchQuery]);
  const filteredRomanceTVSeries = useMemo(() => filterTVSeries(romanceTVSeries, searchQuery), [romanceTVSeries, searchQuery]);
  const filteredCrimeTVSeries = useMemo(() => filterTVSeries(crimeTVSeries, searchQuery), [crimeTVSeries, searchQuery]);
  const filteredMysteryTVSeries = useMemo(() => filterTVSeries(mysteryTVSeries, searchQuery), [mysteryTVSeries, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (popularLoading) {
    return (
      <div className="tv-series-page">
        {/* Carregando sem spinner */}
      </div>
    );
  }

  return (
    <div className="tv-series-page">
      {/* Header com pesquisa */}
      <Header 
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        searchPlaceholder="Pesquisar séries..."
      />
      
      {/* Banner com série em destaque */}
      <TVSeriesBanner tvSeries={popularTVSeries} />

      <div className="carousels-container">
        {/* Séries Populares */}
        {filteredPopularTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="🔥 Em Alta" 
            tvSeries={filteredPopularTVSeries} 
            loading={popularLoading} 
          />
        )}

        {/* Séries por Gênero */}
        {filteredActionTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="⚡ Ação e Aventura" 
            tvSeries={filteredActionTVSeries}
          />
        )}

        {filteredComedyTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="😂 Comédia" 
            tvSeries={filteredComedyTVSeries}
          />
        )}

        {filteredDramaTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="🎭 Drama" 
            tvSeries={filteredDramaTVSeries}
          />
        )}

        {filteredAnimationTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="🎨 Animação" 
            tvSeries={filteredAnimationTVSeries}
          />
        )}

        {filteredScifiTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="🔬 Ficção Científica" 
            tvSeries={filteredScifiTVSeries}
          />
        )}

        {filteredRomanceTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="💕 Romance" 
            tvSeries={filteredRomanceTVSeries}
          />
        )}

        {filteredMysteryTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="🔍 Mistério" 
            tvSeries={filteredMysteryTVSeries}
          />
        )}

        {filteredCrimeTVSeries.length > 0 && (
          <TVSeriesCarousel 
            title="🚨 Crime" 
            tvSeries={filteredCrimeTVSeries}
          />
        )}

        {/* Mostrar mensagem quando não há resultados */}
        {searchQuery && 
         filteredPopularTVSeries.length === 0 && 
         filteredActionTVSeries.length === 0 && 
         filteredComedyTVSeries.length === 0 && 
         filteredDramaTVSeries.length === 0 && 
         filteredAnimationTVSeries.length === 0 && 
         filteredScifiTVSeries.length === 0 && 
         filteredRomanceTVSeries.length === 0 && 
         filteredMysteryTVSeries.length === 0 && 
         filteredCrimeTVSeries.length === 0 && (
          <div className="no-results">
            <h3>Nenhuma série encontrada para "{searchQuery}"</h3>
            <p>Tente pesquisar por outro termo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TVSeriesPage;
