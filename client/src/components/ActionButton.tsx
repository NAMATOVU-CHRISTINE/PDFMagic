import React from 'react';
import { Button } from './Button';
import { Spinner } from './Spinner';

interface ActionButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, loading, disabled, children }) => {
  return (
    <Button onClick={onClick} disabled={disabled || loading} className="w-full py-4 text-lg">
      {loading ? <Spinner size="sm" /> : children}
    </Button>
  );
};

export default ActionButton;
