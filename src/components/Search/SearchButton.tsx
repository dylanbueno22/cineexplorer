import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './SearchButton.css';

interface SearchButtonProps {
  className?: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Pesquisando por:', searchQuery);
      // Implementar lógica de pesquisa futura
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  // Focar no input quando expandir
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className={`search-container ${className} ${isExpanded ? 'expanded' : ''}`}>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder="Pesquisar filmes..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
        </div>
        <button
          type="button"
          onClick={handleSearchClick}
          className="search-button"
          title={isExpanded ? 'Fechar pesquisa' : 'Abrir pesquisa'}
        >
        {isExpanded ? (
          <X size={20} />
        ) : (
          <Search size={20} />
        )}
        </button>
      </form>
    </div>
  );
};

export default SearchButton;
