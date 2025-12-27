import React from 'react';

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
  const sizes = { sm: 'h-2', md: 'h-4', lg: 'h-8', xl: 'h-16' };
  return <div className={sizes[size]} />;
};

export default Spacer;
