export interface AppState {
  theme: 'light' | 'dark';
  isLoading: boolean;
  notification: string | null;
}

export interface FileState {
  files: File[];
  processedFile: Blob | null;
  isProcessing: boolean;
  error: string | null;
}

export interface UserPreferences {
  defaultQuality: 'low' | 'medium' | 'high';
  autoDownload: boolean;
  keepOriginalName: boolean;
}
