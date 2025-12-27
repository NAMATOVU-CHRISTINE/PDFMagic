import axios, { AxiosProgressEvent } from 'axios';

const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 300000, // 5 minutes for large files
});

export interface UploadOptions {
  onUploadProgress?: (progress: number) => void;
}

/**
 * Upload file(s) to an endpoint
 */
export const uploadFiles = async (
  endpoint: string,
  files: File[],
  fieldName: string,
  additionalData?: Record<string, string>,
  options?: UploadOptions
): Promise<Blob> => {
  const formData = new FormData();
  
  files.forEach(file => formData.append(fieldName, file));
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const response = await apiClient.post(endpoint, formData, {
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      if (options?.onUploadProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        options.onUploadProgress(progress);
      }
    },
  });

  return new Blob([response.data]);
};

/**
 * Upload and get JSON response
 */
export const uploadFilesJson = async <T>(
  endpoint: string,
  files: File[],
  fieldName: string,
  additionalData?: Record<string, string>
): Promise<T> => {
  const formData = new FormData();
  
  files.forEach(file => formData.append(fieldName, file));
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const response = await apiClient.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

/**
 * Health check
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/api/health');
    return response.data.status === 'OK';
  } catch {
    return false;
  }
};

export default apiClient;
