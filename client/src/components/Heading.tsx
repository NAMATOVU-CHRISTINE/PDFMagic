import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  darkMode?: boolean;
  centered?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ 
  children, 
  level = 2, 
  className = '',
  darkMode = false,
  centered = false
}) => {
  const sizes = {
    1: 'text-4xl sm:text-5xl font-bold',
    2: 'text-2xl sm:text-3xl font-bold',
    3: 'text-xl sm:text-2xl font-semibold',
    4: 'text-lg font-semibold',
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const colorClass = darkMode ? 'text-white' : 'text-gray-900';
  const alignClass = centered ? 'text-center' : '';

  return (
    <Tag className={`${sizes[level]} ${colorClass} ${alignClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default Heading;
