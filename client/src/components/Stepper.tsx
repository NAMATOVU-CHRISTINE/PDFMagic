import React from 'react';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const Stepper: React.FC<StepperProps> = ({ value, onChange, min = 0, max = 100 }) => {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(Math.max(min, value - 1))} className="w-8 h-8 bg-gray-200 rounded">-</button>
      <span className="w-12 text-center">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="w-8 h-8 bg-gray-200 rounded">+</button>
    </div>
  );
};

export default Stepper;
