import React from 'react';

interface UploadAreaProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFilesSelected, accept = '.pdf', multiple = false }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  };

  return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
      <p className="text-gray-600">Drag & drop files here or click to browse</p>
      <input type="file" accept={accept} multiple={multiple} onChange={(e) => onFilesSelected(Array.from(e.target.files || []))} className="hidden" />
    </div>
  );
};

export default UploadArea;
