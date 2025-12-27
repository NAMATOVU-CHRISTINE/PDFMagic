import React from 'react';

interface DividerProps {
  darkMode?: boolean;
  className?: string;
  vertical?: boolean;
}

const Divider: React.FC<DividerProps> = ({ 
  darkMode = false, 
  className = '',
  vertical = false 
}) => {
  const colorClass = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  
  if (vertical) {
    return <div className={`w-px h-full ${colorClass} ${className}`} />;
  }

  return <hr className={`border-0 h-px ${colorClass} ${className}`} />;
};

export default Divider;
