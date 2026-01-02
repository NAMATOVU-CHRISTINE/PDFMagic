import React from 'react';

interface ArrowIconProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  size?: number;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ direction = 'right', size = 24 }) => {
  const rotations = { up: -90, down: 90, left: 180, right: 0 };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
};

export default ArrowIcon;
