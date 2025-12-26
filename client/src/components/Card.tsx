import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  darkMode = false,
  onClick,
  hoverable = false,
}) => {
  const baseClasses = `rounded-lg shadow-sm border ${
    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
  }`;

  const hoverClasses = hoverable
    ? `cursor-pointer transition-all duration-200 ${
        darkMode ? 'hover:border-gray-600 hover:shadow-md' : 'hover:border-gray-200 hover:shadow-md'
      }`
    : '';

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
