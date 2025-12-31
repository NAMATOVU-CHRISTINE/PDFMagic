import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileState {
  files: File[];
  processedFile: Blob | null;
}

interface FileContextType extends FileState {
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  setProcessedFile: (file: Blob | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FileState>({ files: [], processedFile: null });

  const addFiles = (files: File[]) => setState(s => ({ ...s, files: [...s.files, ...files] }));
  const removeFile = (index: number) => setState(s => ({ ...s, files: s.files.filter((_, i) => i !== index) }));
  const clearFiles = () => setState(s => ({ ...s, files: [] }));
  const setProcessedFile = (processedFile: Blob | null) => setState(s => ({ ...s, processedFile }));

  return (
    <FileContext.Provider value={{ ...state, addFiles, removeFile, clearFiles, setProcessedFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) throw new Error('useFiles must be used within FileProvider');
  return context;
};
