import React from 'react';

interface TagProps {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  onRemove?: () => void;
}

export const Tag: React.FC<TagProps> = ({ children, color = 'blue', onRemove }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${colors[color]}`}>
      {children}
      {onRemove && <button onClick={onRemove} className="ml-2">×</button>}
    </span>
  );
};

export default Tag;
