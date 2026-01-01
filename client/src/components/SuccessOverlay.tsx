import React from 'react';
import { Button } from './Button';

interface SuccessOverlayProps {
  isVisible: boolean;
  onDownload: () => void;
  onClose: () => void;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ isVisible, onDownload, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h3 className="text-xl font-semibold mb-4">Success!</h3>
        <div className="flex gap-4">
          <Button onClick={onDownload}>Download</Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessOverlay;
