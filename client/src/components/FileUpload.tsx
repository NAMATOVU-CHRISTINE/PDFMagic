import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Download, Loader, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface FileUploadProps {
  toolType: string;
  onBack: () => void;
  darkMode?: boolean;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

const FileUpload: React.FC<FileUploadProps> = ({ toolType, onBack, darkMode = false }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Tool-specific options
  const [password, setPassword] = useState('');
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [editText, setEditText] = useState('');
  const [editX, setEditX] = useState('50');
  const [editY, setEditY] = useState('50');
  const [editPage, setEditPage] = useState('1');
  const [editFontSize, setEditFontSize] = useState('12');
  const [editColor, setEditColor] = useState('#000000');
  const [rotation, setRotation] = useState('90');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    setError(null);
    setResult(null);
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

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const processFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      
      switch (toolType) {
        case 'merge': {
          if (files.length < 2) {
            setError('Please select at least 2 PDF files to merge');
            setIsProcessing(false);
            return;
          }
          files.forEach(file => formData.append('pdfs', file));
          const response = await axios.post(`${API_BASE}/api/merge`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'merged.pdf');
          setResult({ type: 'download', message: 'PDF merged successfully!' });
          break;
        }

        case 'split': {
          formData.append('pdf', files[0]);
          const response = await axios.post(`${API_BASE}/api/split`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setResult({ type: 'split', message: response.data.message, files: response.data.files });
          break;
        }

        case 'compress': {
          formData.append('pdf', files[0]);
          const response = await axios.post(`${API_BASE}/api/compress`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'compressed.pdf');
          setResult({ type: 'download', message: 'PDF compressed successfully!' });
          break;
        }

        case 'rotate': {
          formData.append('pdf', files[0]);
          formData.append('rotation', rotation);
          const response = await axios.post(`${API_BASE}/api/rotate`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'rotated.pdf');
          setResult({ type: 'download', message: `PDF rotated ${rotation}° successfully!` });
          break;
        }

        case 'protect': {
          if (!password || password.length < 4) {
            setError('Password must be at least 4 characters');
            setIsProcessing(false);
            return;
          }
          formData.append('pdf', files[0]);
          formData.append('password', password);
          const response = await axios.post(`${API_BASE}/api/protect`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'protected.pdf');
          setResult({ type: 'download', message: 'PDF protected successfully!' });
          break;
        }

        case 'watermark': {
          formData.append('pdf', files[0]);
          formData.append('text', watermarkText);
          const response = await axios.post(`${API_BASE}/api/watermark`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'watermarked.pdf');
          setResult({ type: 'download', message: 'Watermark added successfully!' });
          break;
        }

        case 'edit-pdf': {
          if (!editText) {
            setError('Please enter text to add');
            setIsProcessing(false);
            return;
          }
          formData.append('pdf', files[0]);
          formData.append('text', editText);
          formData.append('x', editX);
          formData.append('y', editY);
          formData.append('pageNum', editPage);
          formData.append('fontSize', editFontSize);
          formData.append('color', editColor);
          const response = await axios.post(`${API_BASE}/api/edit-pdf`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'edited.pdf');
          setResult({ type: 'download', message: 'PDF edited successfully!' });
          break;
        }

        case 'word-to-pdf': {
          formData.append('document', files[0]);
          const response = await axios.post(`${API_BASE}/api/word-to-pdf`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'converted.pdf');
          setResult({ type: 'download', message: 'Word document converted to PDF!' });
          break;
        }

        case 'jpg-to-pdf': {
          files.forEach(file => formData.append('images', file));
          const response = await axios.post(`${API_BASE}/api/jpg-to-pdf`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'images-to-pdf.pdf');
          setResult({ type: 'download', message: 'Images converted to PDF!' });
          break;
        }

        case 'pdf-to-jpg': {
          formData.append('pdf', files[0]);
          const response = await axios.post(`${API_BASE}/api/pdf-to-jpg`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setResult({ type: 'split', message: response.data.message, files: response.data.files.map((f: any) => f.url) });
          break;
        }

        case 'pdf-to-word': {
          formData.append('pdf', files[0]);
          const response = await axios.post(`${API_BASE}/api/pdf-to-word`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'extracted-text.txt');
          setResult({ type: 'download', message: 'Text extracted from PDF!' });
          break;
        }

        case 'pdf-to-excel': {
          formData.append('pdf', files[0]);
          const response = await axios.post(`${API_BASE}/api/pdf-to-excel`, formData, {
            responseType: 'blob',
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          downloadBlob(new Blob([response.data]), 'extracted-data.csv');
          setResult({ type: 'download', message: 'Data extracted to CSV!' });
          break;
        }

        default:
          setResult({ type: 'info', message: `${getToolTitle()} is coming soon!` });
      }
    } catch (err: any) {
      const message = err.response?.data?.error || err.message || 'An error occurred';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSplitFile = async (fileUrl: string, index: number) => {
    try {
      const response = await axios.get(`${API_BASE}${fileUrl}`, { responseType: 'blob' });
      downloadBlob(new Blob([response.data]), `page-${index + 1}.pdf`);
    } catch (err) {
      setError('Failed to download file');
    }
  };

  const getToolTitle = () => {
    const titles: Record<string, string> = {
      'merge': 'Merge PDF Files',
      'split': 'Split PDF File',
      'compress': 'Compress PDF',
      'rotate': 'Rotate PDF',
      'protect': 'Protect PDF',
      'watermark': 'Add Watermark',
      'edit-pdf': 'Edit PDF',
      'pdf-to-jpg': 'PDF to JPG',
      'jpg-to-pdf': 'JPG to PDF',
      'word-to-pdf': 'Word to PDF',
      'pdf-to-word': 'PDF to Word',
      'pdf-to-excel': 'PDF to Excel',
    };
    return titles[toolType] || 'Process PDF';
  };

  const getToolDescription = () => {
    const descriptions: Record<string, string> = {
      'merge': 'Select multiple PDF files to combine them into one document',
      'split': 'Select a PDF file to split it into individual pages',
      'compress': 'Select a PDF file to reduce its size',
      'rotate': 'Select a PDF file to rotate its pages',
      'protect': 'Add password protection to your PDF',
      'watermark': 'Add a watermark text to all pages',
      'edit-pdf': 'Add text to your PDF document',
      'pdf-to-jpg': 'Convert PDF pages to individual files',
      'jpg-to-pdf': 'Convert images into a PDF document',
      'word-to-pdf': 'Convert Word documents to PDF format',
      'pdf-to-word': 'Extract text content from PDF',
      'pdf-to-excel': 'Extract data from PDF to spreadsheet format',
    };
    return descriptions[toolType] || 'Select files to process';
  };

  const inputClass = `w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`rounded-lg shadow-lg p-6 sm:p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{getToolTitle()}</h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{getToolDescription()}</p>

        {/* File Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          {isDragActive ? (
            <p className="text-blue-600">Drop the files here...</p>
          ) : (
            <div>
              <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Drag and drop files here, or click to select
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {['merge', 'jpg-to-pdf'].includes(toolType) ? 'Select multiple files' : 'Select one file'}
              </p>
            </div>
          )}
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Selected Files:</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center min-w-0">
                    <FileText className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                    <span className={`text-sm truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{file.name}</span>
                    <span className={`text-xs ml-2 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700 ml-2">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tool-specific options */}
        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            {toolType === 'rotate' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Rotation Angle
                </label>
                <select value={rotation} onChange={(e) => setRotation(e.target.value)} className={inputClass}>
                  <option value="90">90° Clockwise</option>
                  <option value="180">180°</option>
                  <option value="270">270° (90° Counter-clockwise)</option>
                </select>
              </div>
            )}

            {toolType === 'protect' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password (min 4 characters)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={inputClass}
                />
              </div>
            )}

            {toolType === 'watermark' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter watermark text"
                  className={inputClass}
                />
              </div>
            )}

            {toolType === 'edit-pdf' && (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Text to Add
                  </label>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Enter text"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Page</label>
                    <input type="number" value={editPage} onChange={(e) => setEditPage(e.target.value)} min="1" className={inputClass} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>X Position</label>
                    <input type="number" value={editX} onChange={(e) => setEditX(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Y Position</label>
                    <input type="number" value={editY} onChange={(e) => setEditY(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Font Size</label>
                    <input type="number" value={editFontSize} onChange={(e) => setEditFontSize(e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Color</label>
                  <input type="color" value={editColor} onChange={(e) => setEditColor(e.target.value)} className="h-10 w-20 rounded cursor-pointer" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Process Button */}
        {files.length > 0 && (
          <div className="mt-6">
            <button
              onClick={processFiles}
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                getToolTitle()
              )}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-800 dark:text-green-300 mb-4">{result.message}</p>
            
            {result.type === 'split' && result.files && (
              <div className="space-y-2">
                <h4 className="font-medium text-green-800 dark:text-green-300">Download pages:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.files.map((fileUrl: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => downloadSplitFile(fileUrl, index)}
                      className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-700 text-sm transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Page {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
