import React from 'react';

interface FileSizeProps {
  bytes: number;
}

export const FileSize: React.FC<FileSizeProps> = ({ bytes }) => {
  const formatSize = (b: number): string => {
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  return <span className="text-gray-500">{formatSize(bytes)}</span>;
};

export default FileSize;
