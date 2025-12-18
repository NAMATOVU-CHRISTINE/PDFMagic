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

export const generateFilename = (originalName: string, suffix: string, extension?: string): string => {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const ext = extension || originalName.split('.').pop() || 'pdf';
  return `${nameWithoutExt}-${suffix}.${ext}`;
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const createDownloadLink = (blob: Blob, filename: string): string => {
  return window.URL.createObjectURL(blob);
};

export const revokeDownloadLink = (url: string): void => {
  window.URL.revokeObjectURL(url);
};