import fs from 'fs/promises';
import path from 'path';

/**
 * Clean up temporary files
 */
export const cleanupFiles = async (...paths) => {
  for (const p of paths) {
    try {
      if (p) await fs.unlink(p);
    } catch (e) {
      // Ignore errors - file may already be deleted
    }
  }
};

/**
 * Clean up old files in uploads directory
 * @param {number} maxAgeMs - Maximum age in milliseconds (default: 1 hour)
 */
export const cleanupOldFiles = async (maxAgeMs = 60 * 60 * 1000) => {
  const uploadsDir = 'uploads';
  
  try {
    const files = await fs.readdir(uploadsDir);
    const now = Date.now();
    
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      const stats = await fs.stat(filePath);
      
      if (now - stats.mtimeMs > maxAgeMs) {
        await fs.unlink(filePath);
        console.log(`Cleaned up old file: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning up old files:', error);
  }
};

/**
 * Schedule periodic cleanup
 */
export const scheduleCleanup = (intervalMs = 30 * 60 * 1000) => {
  setInterval(() => {
    cleanupOldFiles();
  }, intervalMs);
  
  console.log(`File cleanup scheduled every ${intervalMs / 60000} minutes`);
};
