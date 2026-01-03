import React from 'react';

interface SplitIconProps {
  size?: number;
}

export const SplitIcon: React.FC<SplitIconProps> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
      <path d="m15 9 6-6" />
    </svg>
  );
};

export default SplitIcon;
