import React from 'react';

interface ZoomOutIconProps {
  size?: number;
}

export const ZoomOutIcon: React.FC<ZoomOutIconProps> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
};

export default ZoomOutIcon;
