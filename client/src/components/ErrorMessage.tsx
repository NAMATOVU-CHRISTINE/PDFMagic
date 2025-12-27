import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  darkMode?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss, darkMode = false }) => {
  return (
    <div className={`p-4 rounded-lg flex items-start ${
      darkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
    }`}>
      <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
      <p className={`flex-1 ${darkMode ? 'text-red-300' : 'text-red-800'}`}>{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-500 hover:text-red-700 ml-2">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
