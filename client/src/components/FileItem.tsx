import React from 'react';
import { FileText, X } from 'lucide-react';

interface FileItemProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
  darkMode?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({ file, index, onRemove, darkMode = false }) => {
  const formatSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="flex items-center min-w-0">
        <FileText className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
        <span className={`text-sm truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {file.name}
        </span>
        <span className={`text-xs ml-2 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          ({formatSize(file.size)} MB)
        </span>
      </div>
      <button 
        onClick={() => onRemove(index)} 
        className="text-red-500 hover:text-red-700 ml-2"
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FileItem;
