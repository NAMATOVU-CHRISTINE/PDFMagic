import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Download, Loader } from 'lucide-react';
import axios from 'axios';

interface FileUploadProps {
  toolType: string;
  onBack: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ toolType, onBack }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setError(null);
  }, []);

  const getAcceptedFiles = () => {
    switch (toolType) {
      case 'jpg-to-pdf':
        return { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] };
      case 'word-to-pdf':
        return { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] };
      default:
        return { 'application/pdf': ['.pdf'] };
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptedFiles(),
    multiple: ['merge', 'jpg-to-pdf'].includes(toolType)
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      
      if (toolType === 'merge') {
        if (files.length < 2) {
          setError('Please select at least 2 PDF files to merge');
          setIsProcessing(false);
          return;
        }
        files.forEach(file => formData.append('pdfs', file));
        
        const response = await axios.post('/api/merge', formData, {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'merged.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
        setResult({ type: 'download', message: 'PDF merged successfully!' });
      } else if (toolType === 'split') {
        formData.append('pdf', files[0]);
        
        const response = await axios.post('/api/split', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        setResult({ 
          type: 'split', 
          message: response.data.message,
          files: response.data.files 
        });
      } else if (toolType === 'compress') {
        formData.append('pdf', files[0]);
        
        const response = await axios.post('/api/compress', formData, {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'compressed.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
        setResult({ type: 'download', message: 'PDF compressed successfully!' });
      } else if (toolType === 'rotate') {
        formData.append('pdf', files[0]);
        formData.append('rotation', '90'); // Default 90 degrees
        
        const response = await axios.post('/api/rotate', formData, {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'rotated.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
        setResult({ type: 'download', message: 'PDF rotated successfully!' });
      } else if (toolType === 'word-to-pdf') {
        formData.append('document', files[0]);
        
        const response = await axios.post('/api/word-to-pdf', formData, {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'converted.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
        setResult({ type: 'download', message: 'Word document converted to PDF successfully!' });
      } else if (toolType === 'jpg-to-pdf') {
        files.forEach(file => formData.append('images', file));
        
        const response = await axios.post('/api/jpg-to-pdf', formData, {
          responseType: 'blob',
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'images-to-pdf.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        
        setResult({ type: 'download', message: 'Images converted to PDF successfully!' });
      } else {
        // For remaining tools, show coming soon message
        setResult({ 
          type: 'info', 
          message: `${getToolTitle()} feature is coming soon! We're working on implementing this functionality.` 
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred while processing the files');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSplitFile = async (fileUrl: string, index: number) => {
    try {
      const response = await axios.get(fileUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `page-${index + 1}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download file');
    }
  };

  const getToolTitle = () => {
    switch (toolType) {
      case 'merge': return 'Merge PDF Files';
      case 'split': return 'Split PDF File';
      case 'compress': return 'Compress PDF';
      case 'rotate': return 'Rotate PDF';
      case 'protect': return 'Protect PDF';
      case 'pdf-to-jpg': return 'PDF to JPG';
      case 'jpg-to-pdf': return 'JPG to PDF';
      case 'word-to-pdf': return 'Word to PDF';
      default: return 'Process PDF';
    }
  };

  const getToolDescription = () => {
    switch (toolType) {
      case 'merge': return 'Select multiple PDF files to combine them into one document';
      case 'split': return 'Select a PDF file to split it into individual pages';
      case 'compress': return 'Select a PDF file to reduce its size while maintaining quality';
      case 'rotate': return 'Select a PDF file to rotate its pages';
      case 'protect': return 'Select a PDF file to add password protection';
      case 'pdf-to-jpg': return 'Select a PDF file to convert each page to JPG images';
      case 'jpg-to-pdf': return 'Select JPG images to convert them into a PDF document';
      case 'word-to-pdf': return 'Select Word documents to convert them to PDF format';
      default: return 'Select files to process';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{getToolTitle()}</h2>
        <p className="text-gray-600 mb-8">{getToolDescription()}</p>

        {/* File Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-blue-600">Drop the PDF files here...</p>
          ) : (
            <div>
              <p className="text-gray-600 mb-2">
                Drag and drop files here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                {['merge', 'jpg-to-pdf'].includes(toolType) ? 'Select multiple files' : 'Select one file'}
              </p>
            </div>
          )}
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files:</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-sm text-gray-900">{file.name}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Button */}
        {files.length > 0 && (
          <div className="mt-6">
            <button
              onClick={processFiles}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                `${getToolTitle()}`
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 mb-4">{result.message}</p>
            
            {result.type === 'split' && result.files && (
              <div className="space-y-2">
                <h4 className="font-medium text-green-800">Download individual pages:</h4>
                {result.files.map((fileUrl: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => downloadSplitFile(fileUrl, index)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Page {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;