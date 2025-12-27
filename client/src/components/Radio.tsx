import React from 'react';

interface RadioProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  darkMode?: boolean;
}

const Radio: React.FC<RadioProps> = ({ checked, onChange, label, darkMode = false }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={onChange}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          checked ? 'border-blue-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
        }`}
      >
        {checked && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
      </div>
      {label && <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{label}</span>}
    </label>
  );
};

export default Radio;
