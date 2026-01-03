import React from 'react';

interface LockIconProps {
  size?: number;
  locked?: boolean;
}

export const LockIcon: React.FC<LockIconProps> = ({ size = 24, locked = true }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d={locked ? "M7 11V7a5 5 0 0 1 10 0v4" : "M7 11V7a5 5 0 0 1 9.9-1"} />
    </svg>
  );
};

export default LockIcon;
