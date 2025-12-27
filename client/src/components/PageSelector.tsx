import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface PageSelectorProps {
  totalPages: number;
  selectedPages: number[];
  onSelectionChange: (pages: number[]) => void;
  darkMode?: boolean;
}

const PageSelector: React.FC<PageSelectorProps> = ({
  totalPages,
  selectedPages,
  onSelectionChange,
  darkMode = false,
}) => {
  const [rangeInput, setRangeInput] = useState('');

  const togglePage = (page: number) => {
    if (selectedPages.includes(page)) {
      onSelectionChange(selectedPages.filter(p => p !== page));
    } else {
      onSelectionChange([...selectedPages, page].sort((a, b) => a - b));
    }
  };

  const selectAll = () => {
    onSelectionChange(Array.from({ length: totalPages }, (_, i) => i + 1));
  };

  const selectNone = () => {
    onSelectionChange([]);
  };

  const selectOdd = () => {
    onSelectionChange(Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p % 2 === 1));
  };

  const selectEven = () => {
    onSelectionChange(Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p % 2 === 0));
  };

  const applyRange = () => {
    const pages: number[] = [];
    const parts = rangeInput.split(',');
    
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
            if (!pages.includes(i)) pages.push(i);
          }
        }
      } else {
        const num = parseInt(trimmed);
        if (!isNaN(num) && num >= 1 && num <= totalPages && !pages.includes(num)) {
          pages.push(num);
        }
      }
    }
    
    onSelectionChange(pages.sort((a, b) => a - b));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={selectAll}
          className={`px-3 py-1 text-sm rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
        >
          Select All
        </button>
        <button
          onClick={selectNone}
          className={`px-3 py-1 text-sm rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
        >
          Select None
        </button>
        <button
          onClick={selectOdd}
          className={`px-3 py-1 text-sm rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
        >
          Odd Pages
        </button>
        <button
          onClick={selectEven}
          className={`px-3 py-1 text-sm rounded ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
        >
          Even Pages
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
          placeholder="e.g., 1-3, 5, 7-10"
          className={`flex-1 px-3 py-2 text-sm rounded border ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
        <button
          onClick={applyRange}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => togglePage(page)}
            className={`relative w-10 h-10 rounded border-2 text-sm font-medium transition-colors ${
              selectedPages.includes(page)
                ? 'bg-blue-500 border-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            }`}
          >
            {page}
            {selectedPages.includes(page) && (
              <Check className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full p-0.5" />
            )}
          </button>
        ))}
      </div>

      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {selectedPages.length} of {totalPages} pages selected
      </p>
    </div>
  );
};

export default PageSelector;
