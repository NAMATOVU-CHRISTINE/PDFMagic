import React from 'react';

interface CounterProps {
  count: number;
  label?: string;
}

export const Counter: React.FC<CounterProps> = ({ count, label }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
      <span className="font-semibold">{count}</span>
      {label && <span>{label}</span>}
    </div>
  );
};

export default Counter;
