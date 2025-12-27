import { useState, useCallback } from 'react';

export const useFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback((newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
    setError(null);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
  }, []);

  const reorderFiles = useCallback((newOrder: File[]) => {
    setFiles(newOrder);
  }, []);

  return {
    files,
    error,
    setError,
    addFiles,
    removeFile,
    clearFiles,
    reorderFiles,
  };
};
