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
      className={`flex items-center gap-2 group transition-all duration-200 hover:scale-[1.02] ${className}`}
    >
      <img 
        src="/lovable-uploads/3b2c28bb-cdb5-4243-9c10-4535c65f4ce6.png" 
        alt="Quentlex Logo" 
        className="h-8 w-8 transition-all duration-200 group-hover:brightness-110"
      />
      {showWordmark && (
        <span className="text-xl font-semibold text-quentlex-dark tracking-tight transition-colors duration-200 group-hover:text-quentlex-gold">
          Quentlex
        </span>
      )}
    </Link>
  );
}