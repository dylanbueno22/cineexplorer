import React from 'react';
import './Navigation.css';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const handleNavClick = (item: string) => {
    console.log(`Navegando para: ${item}`);
    // Implementar navegação futura
  };

  return (
    <nav className={`navigation ${className}`}>
      <ul className="nav-list">
        <li className="nav-item">
          <button 
            className="nav-link active"
            onClick={() => handleNavClick('filmes')}
          >
            Filmes
          </button>
        </li>
        <li className="nav-item">
          <button 
            className="nav-link"
            onClick={() => handleNavClick('series')}
          >
            Séries
          </button>
        </li>
        <li className="nav-item">
          <button 
            className="nav-link"
            onClick={() => handleNavClick('favoritos')}
          >
            Favoritos
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
