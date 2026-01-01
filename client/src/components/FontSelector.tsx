import React from 'react';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Georgia'];

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="px-3 py-2 border rounded">
      {fonts.map(font => <option key={font} value={font}>{font}</option>)}
    </select>
  );
};

export default FontSelector;
