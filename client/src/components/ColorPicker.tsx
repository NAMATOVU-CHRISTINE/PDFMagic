import React from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'];

  return (
    <div className="flex gap-2">
      {colors.map(color => (
        <button key={color} onClick={() => onChange(color)}
          className={`w-8 h-8 rounded-full border-2 ${value === color ? 'border-blue-500' : 'border-gray-300'}`}
          style={{ backgroundColor: color }} />
      ))}
    </div>
  );
};

export default ColorPicker;
