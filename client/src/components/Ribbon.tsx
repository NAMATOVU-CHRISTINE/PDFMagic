import React from 'react';

interface RibbonProps {
  text: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  position?: 'top-left' | 'top-right';
}

const Ribbon: React.FC<RibbonProps> = ({ text, color = 'blue', position = 'top-right' }) => {
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600'
  };

  const positions = {
    'top-left': 'top-0 left-0 -rotate-45 -translate-x-8 translate-y-6',
    'top-right': 'top-0 right-0 rotate-45 translate-x-8 translate-y-6'
  };

  return (
    <div className={`absolute ${positions[position]} ${colors[color]} text-white px-12 py-1 text-sm font-semibold shadow-lg z-10`}>
      {text}
    </div>
  );
};

export default Ribbon;