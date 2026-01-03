import React from 'react';

interface RotateIconProps {
  size?: number;
  direction?: 'cw' | 'ccw';
}

export const RotateIcon: React.FC<RotateIconProps> = ({ size = 24, direction = 'cw' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ transform: direction === 'ccw' ? 'scaleX(-1)' : undefined }}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
};

export default RotateIcon;
