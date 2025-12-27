/**
 * PDF utility functions
 */

/**
 * Check if file is a valid PDF
 */
export const isValidPdf = (file: File): boolean => {
  return file.type === 'application/pdf';
};

/**
 * Check if file is a valid image
 */
export const isValidImage = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * Get file extension
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
};

/**
 * Parse page range string to array of page numbers
 * e.g., "1-3, 5, 7-10" => [1, 2, 3, 5, 7, 8, 9, 10]
 */
export const parsePageRange = (range: string, maxPages: number): number[] => {
  const pages: number[] = [];
  const parts = range.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(n => parseInt(n));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.max(1, start); i <= Math.min(maxPages, end); i++) {
          if (!pages.includes(i)) pages.push(i);
        }
      }
    } else {
      const num = parseInt(trimmed);
      if (!isNaN(num) && num >= 1 && num <= maxPages && !pages.includes(num)) {
        pages.push(num);
      }
    }
  }

  return pages.sort((a, b) => a - b);
};

/**
 * Format page range array to string
 */
export const formatPageRange = (pages: number[]): string => {
  if (pages.length === 0) return '';
  
  const sorted = [...pages].sort((a, b) => a - b);
  const ranges: string[] = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i <= sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      ranges.push(start === end ? `${start}` : `${start}-${end}`);
      start = sorted[i];
      end = sorted[i];
    }
  }

  return ranges.join(', ');
};
