import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  darkMode?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, darkMode = false }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked ? 'bg-blue-500 border-blue-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
        }`}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
      {label && <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{label}</span>}
    </label>
  );
};

export default Checkbox;
