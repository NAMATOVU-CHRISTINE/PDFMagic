import React from 'react';

interface FileDropAreaProps {
  onDrop: (files: File[]) => void;
  children: React.ReactNode;
}

export const FileDropArea: React.FC<FileDropAreaProps> = ({ onDrop, children }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(Array.from(e.dataTransfer.files));
  };

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="border-2 border-dashed border-gray-300 rounded-lg p-8">
      {children}
    </div>
  );
};

export default FileDropArea;
