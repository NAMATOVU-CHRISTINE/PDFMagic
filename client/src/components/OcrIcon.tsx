import React from 'react';

interface OcrIconProps {
  size?: number;
}

export const OcrIcon: React.FC<OcrIconProps> = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 7h.01" />
      <path d="M17 7h.01" />
      <path d="M7 17h.01" />
      <path d="M17 17h.01" />
      <path d="M7 12h10" />
    </svg>
  );
};

export default OcrIcon;
