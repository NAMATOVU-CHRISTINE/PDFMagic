/**
 * Format bytes to human readable string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Calculate compression ratio
 */
export const getCompressionRatio = (originalSize: number, compressedSize: number): string => {
  if (originalSize === 0) return '0%';
  const ratio = ((originalSize - compressedSize) / originalSize) * 100;
  return `${ratio.toFixed(1)}%`;
};

/**
 * Get file size color based on size
 */
export const getFileSizeColor = (bytes: number): string => {
  if (bytes < 1024 * 1024) return 'text-green-600'; // < 1MB
  if (bytes < 10 * 1024 * 1024) return 'text-yellow-600'; // < 10MB
  return 'text-red-600'; // >= 10MB
};
