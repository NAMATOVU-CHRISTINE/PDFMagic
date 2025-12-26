// Application constants

export const APP_NAME = 'PDF Magic';
export const APP_VERSION = '1.0.0';
export const APP_URL = 'https://pdfmagic.app';

// File limits
export const MAX_FILE_SIZE_MB = 50;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_FILES_COUNT = 20;

// Supported file types
export const SUPPORTED_PDF_TYPES = ['application/pdf'];
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const SUPPORTED_DOC_TYPES = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

// Tool categories
export const TOOL_CATEGORIES = {
  ALL: 'all',
  ORGANIZE: 'organize',
  OPTIMIZE: 'optimize',
  CONVERT: 'convert',
  SECURITY: 'security',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  MERGE: '/api/merge',
  SPLIT: '/api/split',
  COMPRESS: '/api/compress',
  ROTATE: '/api/rotate',
  PROTECT: '/api/protect',
  WATERMARK: '/api/watermark',
  EDIT_PDF: '/api/edit-pdf',
  PDF_TO_JPG: '/api/pdf-to-jpg',
  JPG_TO_PDF: '/api/jpg-to-pdf',
  WORD_TO_PDF: '/api/word-to-pdf',
  PDF_TO_WORD: '/api/pdf-to-word',
  PDF_TO_EXCEL: '/api/pdf-to-excel',
  PDF_INFO: '/api/pdf-info',
  EXTRACT_PAGES: '/api/extract-pages',
  ADD_PAGE_NUMBERS: '/api/add-page-numbers',
  EDIT_METADATA: '/api/edit-metadata',
  BATCH_DOWNLOAD: '/api/batch-download',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  DARK_MODE: 'pdfmagic_dark_mode',
  RECENT_FILES: 'pdfmagic_recent_files',
  USER_PREFERENCES: 'pdfmagic_preferences',
} as const;
