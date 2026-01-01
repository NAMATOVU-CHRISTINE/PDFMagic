import React from 'react';
import { Spinner } from './Spinner';

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ status, message }) => {
  if (status === 'idle') return null;

  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-100">
      {status === 'processing' && <Spinner />}
      {status === 'success' && <span className="text-green-500">✓</span>}
      {status === 'error' && <span className="text-red-500">✗</span>}
      <span>{message}</span>
    </div>
  );
};

export default ProcessingStatus;
