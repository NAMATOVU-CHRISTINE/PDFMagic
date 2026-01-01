import React, { useState } from 'react';
import { Input } from './Input';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, placeholder = 'Enter password' }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        {show ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordInput;
