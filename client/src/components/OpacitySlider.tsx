import React from 'react';

interface OpacitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const OpacitySlider: React.FC<OpacitySliderProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">Opacity</span>
      <input type="range" value={value} onChange={(e) => onChange(Number(e.target.value))}
        min={0} max={100} className="flex-1" />
      <span className="w-12 text-center">{value}%</span>
    </div>
  );
};

export default OpacitySlider;
