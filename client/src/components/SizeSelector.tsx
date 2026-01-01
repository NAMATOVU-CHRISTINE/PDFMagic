import React from 'react';

interface SizeSelectorProps {
  value: number;
  onChange: (size: number) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ value, onChange }) => {
  const sizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32];

  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))} className="px-3 py-2 border rounded">
      {sizes.map(size => <option key={size} value={size}>{size}px</option>)}
    </select>
  );
};

export default SizeSelector;
