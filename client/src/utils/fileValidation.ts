export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateFileSize = (file: File, maxSizeMB: number = 50): FileValidationResult => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    };
  }
  
  return { isValid: true };
};

export const validateFileType = (file: File, allowedTypes: string[]): FileValidationResult => {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }
  
  return { isValid: true };
};

export const validatePDFFile = (file: File): FileValidationResult => {
  // Check file type
  const typeValidation = validateFileType(file, ['application/pdf']);
  if (!typeValidation.isValid) {
    return typeValidation;
  }
  
  // Check file size (50MB limit for PDFs)
  const sizeValidation = validateFileSize(file, 50);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }
  
  return { isValid: true };
};

export const validateImageFile = (file: File): FileValidationResult => {
  // Check file type
  const typeValidation = validateFileType(file, ['image/jpeg', 'image/jpg', 'image/png']);
  if (!typeValidation.isValid) {
    return typeValidation;
  }
  
  // Check file size (10MB limit for images)
  const sizeValidation = validateFileSize(file, 10);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }
  
  return { isValid: true };
};

export const validateWordFile = (file: File): FileValidationResult => {
  // Check file type
  const typeValidation = validateFileType(file, [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ]);
  if (!typeValidation.isValid) {
    return typeValidation;
  }
  
  // Check file size (25MB limit for Word docs)
  const sizeValidation = validateFileSize(file, 25);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }
  
  return { isValid: true };
};