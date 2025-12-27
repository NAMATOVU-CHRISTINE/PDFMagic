import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  darkMode?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label, darkMode = false }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-blue-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
      >
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
      {label && <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{label}</span>}
    </label>
  );
};

export default Switch;
