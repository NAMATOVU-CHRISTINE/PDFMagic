import React, { useState } from 'react';
import { GripVertical, X } from 'lucide-react';
import PdfThumbnail from './PdfThumbnail';

interface DraggableFileListProps {
  files: File[];
  onReorder: (files: File[]) => void;
  onRemove: (index: number) => void;
  darkMode?: boolean;
}

const DraggableFileList: React.FC<DraggableFileListProps> = ({
  files,
  onReorder,
  onRemove,
  darkMode = false,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);
    
    onReorder(newFiles);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-move ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          } ${draggedIndex === index ? 'opacity-50' : ''} ${
            dragOverIndex === index ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <div className={`cursor-grab active:cursor-grabbing ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            <GripVertical className="h-5 w-5" />
          </div>
          
          <PdfThumbnail file={file} width={50} height={60} />
          
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {file.name}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          
          <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
            #{index + 1}
          </span>
          
          <button
            onClick={() => onRemove(index)}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DraggableFileList;
