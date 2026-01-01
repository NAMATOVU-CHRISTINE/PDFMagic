import React from 'react';

interface FormatSelectorProps {
  value: string;
  onChange: (value: string) => void;
  formats: { value: string; label: string }[];
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({ value, onChange, formats }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {formats.map(format => (
        <button key={format.value} onClick={() => onChange(format.value)}
          className={`px-4 py-2 rounded-lg ${value === format.value ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
          {format.label}
        </button>
      ))}
    </div>
  );
};

export default FormatSelector;
