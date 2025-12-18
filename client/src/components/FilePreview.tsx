import React from 'react';
import { FileText, Image, FileX, Trash2 } from 'lucide-react';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  index: number;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove, index }) => {
  const getFileIcon = () => {
    if (file.type === 'application/pdf') {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (file.type.startsWith('image/')) {
      return <Image className="h-8 w-8 text-green-500" />;
    } else if (file.type.includes('word')) {
      return <FileText className="h-8 w-8 text-blue-500" />;
    } else {
      return <FileX className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeLabel = () => {
    if (file.type === 'application/pdf') return 'PDF';
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') return 'JPG';
    if (file.type === 'image/png') return 'PNG';
    if (file.type.includes('word')) return 'Word';
    return 'Unknown';
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {getFileIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              #{index + 1}
            </span>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {getFileTypeLabel()}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-900 truncate mt-1" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        title="Remove file"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FilePreview;