import React from 'react';

interface StackProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const Stack: React.FC<StackProps> = ({ children, gap = 'md', className = '' }) => {
  const gaps = { none: '', sm: 'space-y-2', md: 'space-y-4', lg: 'space-y-6' };
  return <div className={`${gaps[gap]} ${className}`}>{children}</div>;
};

export default Stack;
