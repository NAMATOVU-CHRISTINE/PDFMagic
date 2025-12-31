export interface PdfFile {
  id: string;
  name: string;
  size: number;
  pages?: number;
  file: File;
}

export interface ProcessingOptions {
  quality?: 'low' | 'medium' | 'high';
  pages?: string;
  format?: 'jpg' | 'png' | 'docx';
}

export interface ProcessingResult {
  success: boolean;
  filename: string;
  size: number;
  downloadUrl: string;
}

export type ToolType = 'merge' | 'split' | 'compress' | 'convert' | 'rotate' | 'watermark';
