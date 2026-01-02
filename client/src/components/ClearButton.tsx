import React from 'react';

interface ClearButtonProps {
  onClick: () => void;
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-gray-400 hover:text-gray-600">
      ✕
    </button>
  );
};

export default ClearButton;
