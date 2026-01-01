import React from 'react';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm ${selected ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
      {label}
    </button>
  );
};

export default Chip;
