import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  darkMode?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, darkMode = false, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>}
      <textarea
        className={`w-full px-3 py-2 rounded-lg border resize-none ${
          error ? 'border-red-500' : darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
        } focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Textarea;
