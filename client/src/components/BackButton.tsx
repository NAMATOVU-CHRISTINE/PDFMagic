import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  darkMode?: boolean;
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  darkMode = false, 
  label = 'Back to tools' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`mb-6 flex items-center gap-2 ${
        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
      }`}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
};

export default BackButton;
