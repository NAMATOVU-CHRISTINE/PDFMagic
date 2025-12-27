import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  darkMode?: boolean;
  children?: React.ReactNode;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, darkMode = false, children }) => {
  return (
    <div className={`p-4 rounded-lg ${
      darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <p className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>{message}</p>
      </div>
      {children}
    </div>
  );
};

export default SuccessMessage;
