import React from 'react';

interface FlattenIconProps {
  size?: number;
}

export const FlattenIcon: React.FC<FlattenIconProps> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
};

export default FlattenIcon;
