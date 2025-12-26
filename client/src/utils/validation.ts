/**
 * Input validation utilities
 */

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_FILES = 20;

export const ALLOWED_PDF_TYPES = ['application/pdf'];
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const ALLOWED_DOC_TYPES = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword'
];

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateFile = (file: File, allowedTypes: string[]): ValidationResult => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type ${file.type} is not supported` };
  }

  return { valid: true };
};

export const validateFiles = (files: File[], allowedTypes: string[]): ValidationResult => {
  if (!files || files.length === 0) {
    return { valid: false, error: 'No files provided' };
  }

  if (files.length > MAX_FILES) {
    return { valid: false, error: `Maximum ${MAX_FILES} files allowed` };
  }

  for (const file of files) {
    const result = validateFile(file, allowedTypes);
    if (!result.valid) {
      return result;
    }
  }

  return { valid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }

  if (password.length < 4) {
    return { valid: false, error: 'Password must be at least 4 characters' };
  }

  if (password.length > 128) {
    return { valid: false, error: 'Password must be less than 128 characters' };
  }

  return { valid: true };
};

export const validatePageRange = (range: string, maxPages: number): ValidationResult => {
  if (!range) {
    return { valid: true }; // Empty is valid (means all pages)
  }

  const parts = range.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(n => parseInt(n));
      if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
        return { valid: false, error: `Invalid page range: ${trimmed}` };
      }
    } else {
      const page = parseInt(trimmed);
      if (isNaN(page) || page < 1 || page > maxPages) {
        return { valid: false, error: `Invalid page number: ${trimmed}` };
      }
    }
  }

  return { valid: true };
};
