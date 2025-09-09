import React from 'react';
import './AuthButtons.css';

interface AuthButtonsProps {
  className?: string;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className = '' }) => {
  const handleSignUp = () => {
    console.log('Inscrever-se clicado');
    // Implementar lógica de cadastro
  };

  const handleSignIn = () => {
    console.log('Entrar clicado');
    // Implementar lógica de login
  };

  return (
    <div className={`auth-buttons ${className}`}>
      <button 
        className="auth-btn signup-btn"
        onClick={handleSignUp}
      >
        Inscrever-se
      </button>
      <button 
        className="auth-btn signin-btn"
        onClick={handleSignIn}
      >
        Entrar
      </button>
    </div>
  );
};

export default AuthButtons;
