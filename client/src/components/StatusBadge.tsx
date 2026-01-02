import React from 'react';

interface StatusBadgeProps {
  status: 'pending' | 'processing' | 'success' | 'error';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    pending: 'bg-gray-100 text-gray-800',
    processing: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  return <span className={`px-2 py-1 rounded text-sm ${styles[status]}`}>{status}</span>;
};

export default StatusBadge;
