import { useState, useCallback } from 'react';
import { apiService, UploadProgress } from '../services/api';
import { downloadBlob, generateFilename } from '../utils/downloadUtils';
import { handleApiError, FileProcessingError } from '../utils/errorHandling';
import { useNotification } from '../contexts/NotificationContext';

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  message: string;
  error: string | null;
  result: any;
}

export const useFileProcessing = () => {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    message: '',
    error: null,
    result: null
  });

  const { showNotification } = useNotification();

  const updateProgress = useCallback((progress: UploadProgress, message: string) => {
    setState(prev => ({
      ...prev,
      progress: progress.percentage,
      message
    }));
  }, []);

  const resetState = useCallback(() => {
    setState({
      isProcessing: false,
      progress: 0,
      message: '',
      error: null,
      result: null
    });
  }, []);

  const processFiles = useCallback(async (
    toolType: string,
    files: File[]
  ): Promise<void> => {
    if (files.length === 0) {
      throw new FileProcessingError('No files selected');
    }

    setState(prev => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
      result: null
    }));

    try {
      let result: any;
      const onProgress = (progress: UploadProgress) => {
        updateProgress(progress, `Processing... ${progress.percentage}%`);
      };

      switch (toolType) {
        case 'merge':
          if (files.length < 2) {
            throw new FileProcessingError('At least 2 PDF files are required for merging');
          }
          result = await apiService.mergePDFs(files, onProgress);
          downloadBlob(result, 'merged.pdf');
          showNotification('success', 'Success!', 'PDFs merged successfully');
          break;

        case 'split':
          result = await apiService.splitPDF(files[0], onProgress);
          setState(prev => ({ ...prev, result, message: 'PDF split successfully!' }));
          showNotification('success', 'Success!', 'PDF split into individual pages');
          break;

        case 'compress':
          result = await apiService.compressPDF(files[0], onProgress);
          downloadBlob(result, generateFilename(files[0].name, 'compressed'));
          showNotification('success', 'Success!', 'PDF compressed successfully');
          break;

        case 'rotate':
          result = await apiService.rotatePDF(files[0], 90, onProgress);
          downloadBlob(result, generateFilename(files[0].name, 'rotated'));
          showNotification('success', 'Success!', 'PDF rotated successfully');
          break;

        case 'word-to-pdf':
          result = await apiService.convertWordToPDF(files[0], onProgress);
          downloadBlob(result, generateFilename(files[0].name, 'converted', 'pdf'));
          showNotification('success', 'Success!', 'Word document converted to PDF');
          break;

        case 'jpg-to-pdf':
          result = await apiService.convertImagesToPDF(files, onProgress);
          downloadBlob(result, 'images-to-pdf.pdf');
          showNotification('success', 'Success!', 'Images converted to PDF');
          break;

        default:
          throw new FileProcessingError(`Tool "${toolType}" is not yet implemented`);
      }

      setState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 100,
        message: 'Processing completed successfully!',
        result
      }));

    } catch (error) {
      const appError = handleApiError(error);
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: appError.message
      }));
      showNotification('error', 'Processing Failed', appError.message);
      throw appError;
    }
  }, [updateProgress, showNotification]);

  return {
    ...state,
    processFiles,
    resetState
  };
};