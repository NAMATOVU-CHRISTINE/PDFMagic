import React from 'react';

interface PositionSelectorProps {
  value: string;
  onChange: (position: string) => void;
}

export const PositionSelector: React.FC<PositionSelectorProps> = ({ value, onChange }) => {
  const positions = ['top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right'];

  return (
    <div className="grid grid-cols-3 gap-2">
      {positions.map(pos => (
        <button key={pos} onClick={() => onChange(pos)}
          className={`p-2 text-xs rounded ${value === pos ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
          {pos}
        </button>
      ))}
    </div>
  );
};

export default PositionSelector;
