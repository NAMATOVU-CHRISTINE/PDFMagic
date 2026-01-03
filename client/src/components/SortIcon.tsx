import React from 'react';

interface SortIconProps {
  size?: number;
  direction?: 'asc' | 'desc';
}

export const SortIcon: React.FC<SortIconProps> = ({ size = 24, direction }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      {direction === 'asc' && <polyline points="5 12 12 5 19 12" />}
      {direction === 'desc' && <polyline points="19 12 12 19 5 12" />}
      {!direction && <><polyline points="5 9 12 2 19 9" /><polyline points="5 15 12 22 19 15" /></>}
    </svg>
  );
};

export default SortIcon;
