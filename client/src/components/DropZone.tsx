import React from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  darkMode?: boolean;
  multiple?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  darkMode = false,
  multiple = false,
}) => {
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
          : darkMode 
            ? 'border-gray-600 hover:border-gray-500' 
            : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
      {isDragActive ? (
        <p className="text-blue-600">Drop the files here...</p>
      ) : (
        <div>
          <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Drag and drop files here, or click to select
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {multiple ? 'Select multiple files' : 'Select one file'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DropZone;
