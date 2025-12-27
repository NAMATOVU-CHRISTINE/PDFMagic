import React from 'react';

interface PillProps {
  children: React.ReactNode;
  color?: 'gray' | 'blue' | 'green' | 'red' | 'yellow';
  size?: 'sm' | 'md';
}

const Pill: React.FC<PillProps> = ({ children, color = 'gray', size = 'sm' }) => {
  const colors = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' };

  return <span className={`inline-flex items-center rounded-full font-medium ${colors[color]} ${sizes[size]}`}>{children}</span>;
};

export default Pill;
