export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ProcessingResult {
  type: 'download' | 'split' | 'info';
  message: string;
  files?: string[];
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface ProcessingOptions {
  quality?: number;
  rotation?: number;
  password?: string;
  compression?: 'low' | 'medium' | 'high';
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export interface ToolConfig {
  title: string;
  description: string;
  acceptedTypes: string[];
  maxFiles: number;
  maxFileSize: number;
  multipleFiles: boolean;
}

export interface AppConfig {
  name: string;
  description: string;
  version: string;
  author: string;
  repository: string;
}

export interface FileUploadState {
  files: File[];
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  message: string;
  error: string | null;
  result: any;
}