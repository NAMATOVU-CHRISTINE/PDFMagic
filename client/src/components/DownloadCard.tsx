import React from 'react';
import { Button } from './Button';

interface DownloadCardProps {
  filename: string;
  size: string;
  onDownload: () => void;
}

export const DownloadCard: React.FC<DownloadCardProps> = ({ filename, size, onDownload }) => {
  return (
    <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
      <div className="text-green-600 text-4xl mb-4">✓</div>
      <h3 className="font-semibold">{filename}</h3>
      <p className="text-gray-500 text-sm mb-4">{size}</p>
      <Button onClick={onDownload}>Download</Button>
    </div>
  );
};

export default DownloadCard;
