import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', blur = 'md' }) => {
  const blurLevels = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  return (
    <div 
      className={`bg-white/10 ${blurLevels[blur]} border border-white/20 rounded-xl shadow-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;