import React from 'react';
import { FileText, Upload } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  darkMode?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No files selected',
  description = 'Upload files to get started',
  icon,
  action,
  darkMode = false,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}
      >
        {icon || <FileText className={`h-8 w-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />}
      </div>
      <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`text-sm text-center max-w-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="h-4 w-4" />
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
