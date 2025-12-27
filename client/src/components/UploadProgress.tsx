import React from 'react';
import { CheckCircle, Loader, AlertCircle } from 'lucide-react';

interface UploadProgressProps {
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  fileName?: string;
  darkMode?: boolean;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  status,
  fileName,
  darkMode = false,
}) => {
  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return `Uploading... ${progress}%`;
      case 'processing':
        return 'Processing PDF...';
      case 'complete':
        return 'Complete!';
      case 'error':
        return 'Error occurred';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader className="h-5 w-5 animate-spin text-blue-500" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 mb-2">
        {getStatusIcon()}
        <div className="flex-1 min-w-0">
          {fileName && (
            <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {fileName}
            </p>
          )}
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {getStatusText()}
          </p>
        </div>
      </div>
      
      <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
        <div
          className={`h-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${status === 'processing' ? 100 : progress}%` }}
        />
      </div>
    </div>
  );
};

export default UploadProgress;
