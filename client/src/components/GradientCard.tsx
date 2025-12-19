import React from 'react';

interface GradientCardProps {
  children: React.ReactNode;
  gradient?: 'primary' | 'sunset' | 'ocean' | 'forest' | 'fire' | 'purple';
  className?: string;
}

const GradientCard: React.FC<GradientCardProps> = ({ 
  children, 
  gradient = 'primary',
  className = '' 
}) => {
  const gradients = {
    primary: 'from-blue-500 to-purple-600',
    sunset: 'from-orange-500 to-pink-500',
    ocean: 'from-blue-400 to-cyan-400',
    forest: 'from-green-400 to-emerald-600',
    fire: 'from-red-500 to-orange-500',
    purple: 'from-purple-400 to-pink-500'
  };

  return (
    <div className={`bg-gradient-to-br ${gradients[gradient]} rounded-xl shadow-lg p-6 text-white ${className}`}>
      {children}
    </div>
  );
};

export default GradientCard;