import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: 'primary' | 'sunset' | 'ocean' | 'fire' | 'rainbow';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  gradient = 'primary',
  className = '' 
}) => {
  const gradients = {
    primary: 'from-blue-600 to-purple-600',
    sunset: 'from-orange-500 to-pink-500',
    ocean: 'from-blue-400 to-cyan-400',
    fire: 'from-red-500 to-yellow-500',
    rainbow: 'from-red-500 via-yellow-500 to-blue-500'
  };

  return (
    <span className={`bg-gradient-to-r ${gradients[gradient]} bg-clip-text text-transparent font-bold ${className}`}>
      {children}
    </span>
  );
};

export default GradientText;