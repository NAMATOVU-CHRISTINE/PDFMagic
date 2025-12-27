import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  onClick: () => void;
  label: string;
  darkMode?: boolean;
  size?: 'sm' | 'md';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  onClick, 
  label, 
  darkMode = false,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg transition-colors ${sizeClasses[size]} ${
        darkMode 
          ? 'bg-green-800 text-green-200 hover:bg-green-700' 
          : 'bg-green-100 text-green-800 hover:bg-green-200'
      }`}
    >
      <Download className="h-4 w-4" />
      {label}
    </button>
  );
};

export default DownloadButton;
