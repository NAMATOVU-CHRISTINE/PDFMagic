import React from 'react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
  if (files.length === 0) return null;

  return (
    <ul className="space-y-2">
      {files.map((file, index) => (
        <li key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded">
          <span className="truncate">{file.name}</span>
          <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-700">Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
