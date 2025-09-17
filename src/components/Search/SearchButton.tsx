import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './SearchButton.css';

interface SearchButtonProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ 
  className = '', 
  placeholder = 'Pesquisar...',
  onSearch,
  onClear
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && searchQuery.trim()) {
      // Se está fechando e há uma query, limpar
      setSearchQuery('');
      onClear?.();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Pesquisa em tempo real
    if (value.trim()) {
      onSearch?.(value.trim());
    } else {
      onClear?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setSearchQuery('');
      onClear?.();
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
            placeholder={placeholder}
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
