import React from 'react';

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  darkMode?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, required, darkMode = false }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
