import React from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ children, size = 'md', color }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return <span className={`inline-flex items-center justify-center ${sizes[size]}`} style={{ color }}>{children}</span>;
};

export default IconWrapper;
