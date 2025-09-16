import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MoviesPage from './pages/MoviesPage';
import TVSeriesPage from './pages/TVSeriesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/filmes" element={<MoviesPage />} />
        <Route path="/series" element={<TVSeriesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App
