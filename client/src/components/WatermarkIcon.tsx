import React from 'react';

interface WatermarkIconProps {
  size?: number;
}

export const WatermarkIcon: React.FC<WatermarkIconProps> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
};

export default WatermarkIcon;
