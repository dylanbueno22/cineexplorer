import { Routes, Route } from 'react-router-dom';
import { MoviesPage, MovieDetailsPage } from './pages/movies';
import { TVSeriesPage, TVSeriesDetailsPage } from './pages/tv-series';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/filmes" element={<MoviesPage />} />
        <Route path="/series" element={<TVSeriesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/tv/:id" element={<TVSeriesDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App
