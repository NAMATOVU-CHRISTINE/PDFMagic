import React from 'react';

interface PageNumberIconProps {
  size?: number;
}

export const PageNumberIcon: React.FC<PageNumberIconProps> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">1</text>
    </svg>
  );
};

export default PageNumberIcon;
