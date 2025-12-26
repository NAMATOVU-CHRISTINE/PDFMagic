import React from 'react';
import { FileText, HardDrive } from 'lucide-react';
import { formatFileSize, getFileSizeColor } from '../utils/fileSize';

interface FileInfoProps {
  file: File;
  darkMode?: boolean;
  compressedSize?: number;
}

const FileInfo: React.FC<FileInfoProps> = ({ file, darkMode = false, compressedSize }) => {
  const originalSize = file.size;
  const showComparison = compressedSize !== undefined && compressedSize !== originalSize;
  const savings = showComparison ? originalSize - compressedSize : 0;
  const savingsPercent = showComparison ? ((savings / originalSize) * 100).toFixed(1) : 0;

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="flex items-start gap-3">
        <FileText className="h-8 w-8 text-red-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {file.name}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <HardDrive className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm ${getFileSizeColor(originalSize)}`}>
              {formatFileSize(originalSize)}
            </span>
            {showComparison && (
              <>
                <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>→</span>
                <span className="text-sm text-green-600 font-medium">
                  {formatFileSize(compressedSize)}
                </span>
                <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">
                  -{savingsPercent}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInfo;
