import React from 'react';

interface ShimmerEffectProps {
  width?: string;
  height?: string;
  className?: string;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ 
  width = '100%', 
  height = '20px',
  className = '' 
}) => {
  return (
    <div 
      className={`relative overflow-hidden bg-gray-200 rounded ${className}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent"></div>
    </div>
  );
};

export default ShimmerEffect;