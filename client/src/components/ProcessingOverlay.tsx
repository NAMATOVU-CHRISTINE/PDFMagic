import React from 'react';
import { Spinner } from './Spinner';

interface ProcessingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ isVisible, message = 'Processing...' }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <Spinner size="lg" />
        <p className="mt-4">{message}</p>
      </div>
    </div>
  );
};

export default ProcessingOverlay;
