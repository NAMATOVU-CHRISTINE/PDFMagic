import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  darkMode?: boolean;
}

const Counter: React.FC<CounterProps> = ({ value, onChange, min = 0, max = 100, darkMode = false }) => {
  const decrement = () => onChange(Math.max(min, value - 1));
  const increment = () => onChange(Math.min(max, value + 1));
  const btnClass = `p-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`;

  return (
    <div className="flex items-center gap-2">
      <button onClick={decrement} className={btnClass} disabled={value <= min}><Minus className="h-4 w-4" /></button>
      <span className={`w-12 text-center font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</span>
      <button onClick={increment} className={btnClass} disabled={value >= max}><Plus className="h-4 w-4" /></button>
    </div>
  );
};

export default Counter;
