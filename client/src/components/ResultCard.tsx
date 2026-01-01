import React from 'react';
import { Button } from './Button';

interface ResultCardProps {
  success: boolean;
  filename?: string;
  onDownload?: () => void;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ success, filename, onDownload, onReset }) => {
  return (
    <div className={`p-8 rounded-lg text-center ${success ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="text-5xl mb-4">{success ? '✓' : '✗'}</div>
      <h3 className="text-xl font-semibold mb-2">{success ? 'Success!' : 'Failed'}</h3>
      {filename && <p className="text-gray-600 mb-4">{filename}</p>}
      <div className="flex gap-4 justify-center">
        {success && onDownload && <Button onClick={onDownload}>Download</Button>}
        <Button variant="outline" onClick={onReset}>Process Another</Button>
      </div>
    </div>
  );
};

export default ResultCard;
