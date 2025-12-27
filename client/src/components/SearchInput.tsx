import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  darkMode?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = 'Search...', darkMode = false }) => {
  return (
    <div className="relative">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2">
          <X className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
