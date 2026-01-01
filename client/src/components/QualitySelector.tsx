import React from 'react';

interface QualitySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({ value, onChange }) => {
  const options = [
    { value: 'low', label: 'Low', description: 'Smallest file size' },
    { value: 'medium', label: 'Medium', description: 'Balanced' },
    { value: 'high', label: 'High', description: 'Best quality' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          className={`p-4 rounded-lg border-2 ${value === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
          <div className="font-semibold">{opt.label}</div>
          <div className="text-sm text-gray-500">{opt.description}</div>
        </button>
      ))}
    </div>
  );
};

export default QualitySelector;
