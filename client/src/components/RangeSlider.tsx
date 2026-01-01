import React from 'react';

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  return (
    <div className="flex items-center gap-4">
      <input type="range" value={value} onChange={(e) => onChange(Number(e.target.value))}
        min={min} max={max} step={step} className="flex-1" />
      <span className="w-12 text-center">{value}</span>
    </div>
  );
};

export default RangeSlider;
