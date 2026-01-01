import React from 'react';

interface RotationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RotationSelector: React.FC<RotationSelectorProps> = ({ value, onChange }) => {
  const options = [
    { value: '90', label: '90°' },
    { value: '180', label: '180°' },
    { value: '270', label: '270°' },
  ];

  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`px-6 py-3 rounded-lg ${value === opt.value ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default RotationSelector;
