import React from 'react';
import { Button } from './Button';

interface ErrorOverlayProps {
  isVisible: boolean;
  message?: string;
  onRetry?: () => void;
  onClose: () => void;
}

export const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ isVisible, message = 'An error occurred', onRetry, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h3 className="text-xl font-semibold mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        <div className="flex gap-4 justify-center">
          {onRetry && <Button onClick={onRetry}>Retry</Button>}
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorOverlay;
