import { useState, useCallback } from 'react';

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
}

export const useProcessing = () => {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    status: 'idle',
  });

  const startProcessing = useCallback(() => {
    setState({ isProcessing: true, progress: 0, status: 'uploading' });
  }, []);

  const setProgress = useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress }));
  }, []);

  const setStatus = useCallback((status: ProcessingState['status']) => {
    setState(prev => ({ ...prev, status }));
  }, []);

  const completeProcessing = useCallback(() => {
    setState({ isProcessing: false, progress: 100, status: 'complete' });
  }, []);

  const errorProcessing = useCallback(() => {
    setState({ isProcessing: false, progress: 0, status: 'error' });
  }, []);

  const resetProcessing = useCallback(() => {
    setState({ isProcessing: false, progress: 0, status: 'idle' });
  }, []);

  return {
    ...state,
    startProcessing,
    setProgress,
    setStatus,
    completeProcessing,
    errorProcessing,
    resetProcessing,
  };
};
