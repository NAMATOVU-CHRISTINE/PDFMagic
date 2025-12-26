import { useState, useEffect, useCallback } from 'react';
import { RecentFile } from '../types/api';

const STORAGE_KEY = 'pdfmagic_recent_files';
const MAX_RECENT_FILES = 10;

export const useRecentFiles = () => {
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentFiles(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addRecentFile = useCallback((file: Omit<RecentFile, 'id' | 'timestamp'>) => {
    const newFile: RecentFile = {
      ...file,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };

    setRecentFiles((prev) => {
      const updated = [newFile, ...prev.filter(f => f.name !== file.name)].slice(0, MAX_RECENT_FILES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentFiles = useCallback(() => {
    setRecentFiles([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const removeRecentFile = useCallback((id: string) => {
    setRecentFiles((prev) => {
      const updated = prev.filter(f => f.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    recentFiles,
    addRecentFile,
    clearRecentFiles,
    removeRecentFile,
  };
};
