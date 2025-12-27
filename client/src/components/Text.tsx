import React from 'react';

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg';
  className?: string;
  darkMode?: boolean;
  muted?: boolean;
}

const Text: React.FC<TextProps> = ({ 
  children, 
  size = 'base', 
  className = '',
  darkMode = false,
  muted = false
}) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const colorClass = muted 
    ? (darkMode ? 'text-gray-400' : 'text-gray-500')
    : (darkMode ? 'text-gray-300' : 'text-gray-700');

  return (
    <p className={`${sizes[size]} ${colorClass} ${className}`}>
      {children}
    </p>
  );
};

export default Text;
