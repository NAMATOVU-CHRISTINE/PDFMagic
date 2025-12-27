/**
 * Download a blob as a file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Download from URL
 */
export const downloadFromUrl = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    downloadBlob(blob, filename);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

/**
 * Get suggested filename based on tool type
 */
export const getSuggestedFilename = (toolType: string, originalName?: string): string => {
  const baseName = originalName?.replace(/\.[^/.]+$/, '') || 'output';
  
  const suffixes: Record<string, string> = {
    'merge': 'merged.pdf',
    'split': 'split.pdf',
    'compress': 'compressed.pdf',
    'rotate': 'rotated.pdf',
    'protect': 'protected.pdf',
    'watermark': 'watermarked.pdf',
    'unlock-pdf': 'unlocked.pdf',
    'sign-pdf': 'signed.pdf',
  };

  return suffixes[toolType] || `${baseName}-processed.pdf`;
};
