import React from 'react';
import { Input } from './Input';

interface PageRangeInputProps {
  value: string;
  onChange: (value: string) => void;
  totalPages?: number;
}

export const PageRangeInput: React.FC<PageRangeInputProps> = ({ value, onChange, totalPages }) => {
  return (
    <div>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="e.g., 1-3, 5, 7-10" />
      {totalPages && <p className="text-sm text-gray-500 mt-1">Total pages: {totalPages}</p>}
    </div>
  );
};

export default PageRangeInput;
