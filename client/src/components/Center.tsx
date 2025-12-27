import React from 'react';

interface CenterProps {
  children: React.ReactNode;
  className?: string;
}

const Center: React.FC<CenterProps> = ({ children, className = '' }) => {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
};

export default Center;
