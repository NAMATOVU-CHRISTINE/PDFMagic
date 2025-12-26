import React, { useState } from 'react';
import { Package, Loader } from 'lucide-react';
import axios from 'axios';

interface BatchDownloadProps {
  files: string[];
}

const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

const BatchDownload: React.FC<BatchDownloadProps> = ({ files }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleBatchDownload = async () => {
    if (files.length === 0) return;

    setIsDownloading(true);
    try {
      const response = await axios.post(
        `${API_BASE}/api/batch-download`,
        { files },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pdf-magic-files.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Batch download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (files.length < 2) return null;

  return (
    <button
      onClick={handleBatchDownload}
      disabled={isDownloading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDownloading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Package className="h-4 w-4" />
      )}
      <span className="text-sm font-medium">
        {isDownloading ? 'Creating ZIP...' : `Download All (${files.length} files)`}
      </span>
    </button>
  );
};

export default BatchDownload;
