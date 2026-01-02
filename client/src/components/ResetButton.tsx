import React from 'react';
import { Button } from './Button';

interface ResetButtonProps {
  onReset: () => void;
  label?: string;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset, label = 'Start Over' }) => {
  return (
    <Button variant="outline" onClick={onReset}>
      {label}
    </Button>
  );
};

export default ResetButton;
