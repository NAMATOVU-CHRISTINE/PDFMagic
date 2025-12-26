import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  darkMode?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, darkMode = false, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const selectClasses = `w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : darkMode
        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
    } ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className={`block text-sm font-medium mb-1 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {label}
          </label>
        )}
        <select ref={ref} id={selectId} className={selectClasses} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
