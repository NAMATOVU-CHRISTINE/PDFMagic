// API Response Types

export interface ApiError {
  error: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}

export interface SplitResponse {
  message: string;
  files: string[];
}

export interface PdfToJpgResponse {
  message: string;
  pageCount: number;
  files: Array<{
    page: number;
    url: string;
  }>;
}

export interface PdfInfoResponse {
  pageCount: number;
  title: string;
  author: string;
  subject: string;
  creator: string;
  producer: string;
  fileSize: number;
  fileName: string;
}

export interface ProcessResult {
  type: 'download' | 'split' | 'info';
  message: string;
  files?: string[];
  originalSize?: number;
  compressedSize?: number;
}

export interface RecentFile {
  id: string;
  name: string;
  size: number;
  tool: string;
  timestamp: number;
}

export interface MetadataUpdate {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
}
