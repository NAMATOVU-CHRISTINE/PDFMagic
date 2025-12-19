import React from 'react';

interface PulsingDotProps {
  color?: 'green' | 'red' | 'yellow' | 'blue';
  size?: 'sm' | 'md' | 'lg';
}

const PulsingDot: React.FC<PulsingDotProps> = ({ color = 'green', size = 'md' }) => {
  const colors = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500'
  };

  const sizes = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  return (
    <span className="relative flex">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors[color]} opacity-75`}></span>
      <span className={`relative inline-flex rounded-full ${sizes[size]} ${colors[color]}`}></span>
    </span>
  );
};

export default PulsingDot;