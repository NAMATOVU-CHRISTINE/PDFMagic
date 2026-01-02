import React, { useState } from 'react';
import { Button } from './Button';

interface ConfirmButtonProps {
  onConfirm: () => void;
  children: React.ReactNode;
  confirmText?: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onConfirm, children, confirmText = 'Are you sure?' }) => {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex gap-2">
        <Button onClick={onConfirm} variant="primary">Yes</Button>
        <Button onClick={() => setConfirming(false)} variant="outline">No</Button>
      </div>
    );
  }

  return <Button onClick={() => setConfirming(true)}>{children}</Button>;
};

export default ConfirmButton;
