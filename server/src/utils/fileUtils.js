import fs from 'fs/promises';
import path from 'path';

/**
 * Generate unique filename
 */
export const generateFilename = (prefix, extension = 'pdf') => {
  return `${prefix}-${Date.now()}.${extension}`;
};

/**
 * Get file size in MB
 */
export const getFileSizeMB = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2);
};

/**
 * Check if file exists
 */
export const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Ensure directory exists
 */
export const ensureDir = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
};

/**
 * Get file extension
 */
export const getExtension = (filename) => {
  return path.extname(filename).toLowerCase().slice(1);
};

/**
 * Is valid PDF file
 */
export const isValidPdf = (mimetype) => {
  return mimetype === 'application/pdf';
};

/**
 * Is valid image file
 */
export const isValidImage = (mimetype) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(mimetype);
};
