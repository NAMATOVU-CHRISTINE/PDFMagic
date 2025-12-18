import axios, { AxiosProgressEvent } from 'axios';

const API_BASE_URL = '/api';

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class ApiService {
  private static instance: ApiService;

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async mergePDFs(files: File[], onProgress?: (progress: UploadProgress) => void): Promise<Blob> {
    const formData = new FormData();
    files.forEach(file => formData.append('pdfs', file));

    const response = await axios.post(`${API_BASE_URL}/merge`, formData, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage
          });
        }
      }
    });

    return response.data;
  }

  async splitPDF(file: File, onProgress?: (progress: UploadProgress) => void): Promise<{ message: string; files: string[] }> {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await axios.post(`${API_BASE_URL}/split`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage
          });
        }
      }
    });

    return response.data;
  }

  async compressPDF(file: File, onProgress?: (progress: UploadProgress) => void): Promise<Blob> {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await axios.post(`${API_BASE_URL}/compress`, formData, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage
          });
        }
      }
    });

    return response.data;
  }

  async rotatePDF(file: File, rotation: number = 90, onProgress?: (progress: UploadProgress) => void): Promise<Blob> {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('rotation', rotation.toString());

    const response = await axios.post(`${API_BASE_URL}/rotate`, formData, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage
          });
        }
      }
    });

    return response.data;
  }

  async convertWordToPDF(file: File, onProgress?: (progress: UploadProgress) => void): Promise<Blob> {
    const formData = new FormData();
    formData.append('document', file);

    const response = await axios.post(`${API_BASE_URL}/word-to-pdf`, formData, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage
          });
        }
      }
    });

    return response.data;
  }

  async convertImagesToPDF(files: File[], onProgress?: (progress: UploadProgress) => void): Promise<Blob> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    const response = await axios.post(`${API_BASE_URL}/jpg-to-pdf`, formData, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage
          });
        }
      }
    });

    return response.data;
  }

  async downloadFile(fileUrl: string): Promise<Blob> {
    const response = await axios.get(fileUrl, { responseType: 'blob' });
    return response.data;
  }

  async healthCheck(): Promise<{ status: string; message: string }> {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  }
}

export const apiService = ApiService.getInstance();