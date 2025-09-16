import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/filmes' && location.pathname === '/');
  };

  return (
    <nav className={`navigation ${className}`}>
      <ul className="nav-list">
        <li className="nav-item">
          <button 
            className={`nav-link ${isActive('/filmes') ? 'active' : ''}`}
            onClick={() => handleNavClick('/filmes')}
          >
            Filmes
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${isActive('/series') ? 'active' : ''}`}
            onClick={() => handleNavClick('/series')}
          >
            Séries
          </button>
        </li>
        <li className="nav-item">
          <button 
            className="nav-link"
            onClick={() => handleNavClick('/favoritos')}
          >
            Favoritos
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
