import React from 'react';
import { Input } from './Input';

interface WatermarkInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const WatermarkInput: React.FC<WatermarkInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Enter watermark text" />
      <p className="text-sm text-gray-500">The watermark will appear on all pages</p>
    </div>
  );
};

export default WatermarkInput;
