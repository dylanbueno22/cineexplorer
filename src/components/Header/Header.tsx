import React from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import SearchButton from '../Search/SearchButton';
import AuthButtons from '../Auth/AuthButtons';
import './Header.css';

interface HeaderProps {
  className?: string;
  onSearch?: (query: string) => void;
  onClearSearch?: () => void;
  searchPlaceholder?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  className = '', 
  onSearch, 
  onClearSearch, 
  searchPlaceholder = 'Pesquisar...' 
}) => {
  return (
    <header className={`header ${className}`}>
      <div className="header-container">
        <ul className="header-nav-list">
          <li className="header-nav-item logo-item">
            <Logo size="medium" />
          </li>
          <li className="header-nav-item nav-item">
            <Navigation />
          </li>
        </ul>

        {/* Botão de Pesquisa e Autenticação */}
        <div className="header-right">
          <SearchButton 
            placeholder={searchPlaceholder}
            onSearch={onSearch}
            onClear={onClearSearch}
          />
          <AuthButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
