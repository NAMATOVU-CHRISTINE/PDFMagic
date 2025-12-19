import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  text?: string;
}

const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className = '', text }) => {
  if (orientation === 'vertical') {
    return <div className={`w-px bg-gray-200 ${className}`} />;
  }

  if (text) {
    return (
      <div className={`relative flex items-center ${className}`}>
        <div className="flex-grow border-t border-gray-200" />
        <span className="px-4 text-sm text-gray-500">{text}</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>
    );
  }

  return <div className={`border-t border-gray-200 ${className}`} />;
};

export default Divider;