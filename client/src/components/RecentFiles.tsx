import React from 'react';
import { Clock, Trash2, X } from 'lucide-react';
import { RecentFile } from '../types/api';
import { formatFileSize } from '../utils/fileSize';

interface RecentFilesProps {
  files: RecentFile[];
  onClear: () => void;
  onRemove: (id: string) => void;
  onSelect?: (file: RecentFile) => void;
  darkMode?: boolean;
}

const RecentFiles: React.FC<RecentFilesProps> = ({
  files,
  onClear,
  onRemove,
  onSelect,
  darkMode = false,
}) => {
  if (files.length === 0) return null;

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className={`rounded-lg p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Files
          </h3>
        </div>
        <button
          onClick={onClear}
          className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Clear all
        </button>
      </div>
      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={file.id}
            className={`flex items-center justify-between p-2 rounded ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            } ${onSelect ? 'cursor-pointer' : ''}`}
            onClick={() => onSelect?.(file)}
          >
            <div className="flex-1 min-w-0">
              <p className={`text-sm truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {file.name}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {formatFileSize(file.size)} • {file.tool} • {formatTime(file.timestamp)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(file.id);
              }}
              className={`p-1 rounded ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
              aria-label={`Remove ${file.name} from recent files`}
            >
              <X className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentFiles;
