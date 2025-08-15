import React from 'react';
import { Link } from 'react-router-dom';

interface QuentlexLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function QuentlexLogo({ className = "", showWordmark = true }: QuentlexLogoProps) {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-3 group transition-all duration-200 hover:scale-[1.02] ${className}`}
    >
      <img 
        src="/lovable-uploads/e7b6043d-0074-4ccc-987c-d840b7ba3368.png" 
        alt="Quentlex Logo" 
        className="h-10 w-auto transition-all duration-200 group-hover:brightness-110"
      />
      {showWordmark && (
        <span className="text-xl font-semibold text-quentlex-dark tracking-tight transition-colors duration-200 group-hover:text-quentlex-gold">
          Quentlex
        </span>
      )}
    </Link>
  );
}