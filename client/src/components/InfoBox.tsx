import React from 'react';

interface InfoBoxProps {
  type?: 'info' | 'warning' | 'success' | 'error';
  children: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ type = 'info', children }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return <div className={`p-4 rounded-lg border ${colors[type]}`}>{children}</div>;
};

export default InfoBox;
