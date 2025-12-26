import React, { useState } from 'react';
import { Save, FileText } from 'lucide-react';
import { MetadataUpdate } from '../types/api';

interface MetadataEditorProps {
  initialData?: MetadataUpdate;
  onSave: (metadata: MetadataUpdate) => void;
  isLoading?: boolean;
  darkMode?: boolean;
}

const MetadataEditor: React.FC<MetadataEditorProps> = ({
  initialData = {},
  onSave,
  isLoading = false,
  darkMode = false,
}) => {
  const [metadata, setMetadata] = useState<MetadataUpdate>({
    title: initialData.title || '',
    author: initialData.author || '',
    subject: initialData.subject || '',
    keywords: initialData.keywords || '',
    creator: initialData.creator || '',
  });

  const handleChange = (field: keyof MetadataUpdate, value: string) => {
    setMetadata((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(metadata);
  };

  const inputClass = `w-full px-3 py-2 rounded-lg border ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

  const labelClass = `block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Edit PDF Metadata
        </h3>
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>Title</label>
        <input
          id="title"
          type="text"
          value={metadata.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Document title"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="author" className={labelClass}>Author</label>
        <input
          id="author"
          type="text"
          value={metadata.author}
          onChange={(e) => handleChange('author', e.target.value)}
          placeholder="Author name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>Subject</label>
        <input
          id="subject"
          type="text"
          value={metadata.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          placeholder="Document subject"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="keywords" className={labelClass}>Keywords</label>
        <input
          id="keywords"
          type="text"
          value={metadata.keywords}
          onChange={(e) => handleChange('keywords', e.target.value)}
          placeholder="keyword1, keyword2, keyword3"
          className={inputClass}
        />
        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Separate keywords with commas
        </p>
      </div>

      <div>
        <label htmlFor="creator" className={labelClass}>Creator</label>
        <input
          id="creator"
          type="text"
          value={metadata.creator}
          onChange={(e) => handleChange('creator', e.target.value)}
          placeholder="Application that created the document"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Save className="h-4 w-4" />
        {isLoading ? 'Saving...' : 'Save Metadata'}
      </button>
    </form>
  );
};

export default MetadataEditor;
