import React from 'react';

interface PageSelectorProps {
  totalPages: number;
  selected: number[];
  onChange: (pages: number[]) => void;
}

export const PageSelector: React.FC<PageSelectorProps> = ({ totalPages, selected, onChange }) => {
  const toggle = (page: number) => {
    onChange(selected.includes(page) ? selected.filter(p => p !== page) : [...selected, page]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button key={page} onClick={() => toggle(page)}
          className={`w-10 h-10 rounded ${selected.includes(page) ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default PageSelector;
