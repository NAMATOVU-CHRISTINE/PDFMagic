import fs from 'fs/promises';
import path from 'path';

export const ensureDirectoryExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw error;
    }
  }
};

export const cleanupFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.warn(`Failed to cleanup file ${filePath}:`, error.message);
  }
};

export const cleanupFiles = async (filePaths) => {
  const cleanupPromises = filePaths.map(filePath => cleanupFile(filePath));
  await Promise.allSettled(cleanupPromises);
};

export const generateUniqueFilename = (originalName, suffix = '') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = path.extname(originalName);
  const baseName = path.basename(originalName, extension);
  
  return `${baseName}${suffix ? '-' + suffix : ''}-${timestamp}-${random}${extension}`;
};

export const getFileSize = async (filePath) => {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
};

export const isValidPDF = async (filePath) => {
  try {
    const buffer = await fs.readFile(filePath);
    // Check PDF magic number
    return buffer.length > 4 && 
           buffer[0] === 0x25 && 
           buffer[1] === 0x50 && 
           buffer[2] === 0x44 && 
           buffer[3] === 0x46;
  } catch (error) {
    return false;
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const scheduleFileCleanup = (filePath, delayMs = 300000) => {
  // Schedule file cleanup after 5 minutes by default
  setTimeout(async () => {
    await cleanupFile(filePath);
  }, delayMs);
};

export const createTempDirectory = async () => {
  const tempDir = path.join(process.cwd(), 'temp', Date.now().toString());
  await ensureDirectoryExists(tempDir);
  return tempDir;
};