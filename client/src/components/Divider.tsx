import React from 'react';

interface DividerProps {
  text?: string;
}

export const Divider: React.FC<DividerProps> = ({ text }) => {
  if (text) {
    return (
      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-500 text-sm">{text}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    );
  }
  return <hr className="my-4 border-gray-200" />;
};

export default Divider;
