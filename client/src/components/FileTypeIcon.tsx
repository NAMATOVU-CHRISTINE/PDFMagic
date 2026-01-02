import React from 'react';

interface FileTypeIconProps {
  type: string;
  size?: number;
}

export const FileTypeIcon: React.FC<FileTypeIconProps> = ({ type, size = 24 }) => {
  const icons: Record<string, string> = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    jpg: '🖼️',
    png: '🖼️',
    default: '📁',
  };

  return <span style={{ fontSize: size }}>{icons[type] || icons.default}</span>;
};

export default FileTypeIcon;
