import React, { useState } from 'react';
import { Hash } from 'lucide-react';

interface PageNumberOptionsProps {
  onApply: (options: PageNumberSettings) => void;
  isLoading?: boolean;
  darkMode?: boolean;
}

export interface PageNumberSettings {
  position: 'top' | 'bottom';
  startNumber: number;
  format: string;
}

const PageNumberOptions: React.FC<PageNumberOptionsProps> = ({
  onApply,
  isLoading = false,
  darkMode = false,
}) => {
  const [settings, setSettings] = useState<PageNumberSettings>({
    position: 'bottom',
    startNumber: 1,
    format: 'Page {n}',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(settings);
  };

  const inputClass = `w-full px-3 py-2 rounded-lg border ${
    darkMode
      ? 'bg-gray-700 border-gray-600 text-white'
      : 'bg-white border-gray-300 text-gray-900'
  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`;

  const labelClass = `block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Hash className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Page Number Options
        </h3>
      </div>

      <div>
        <label htmlFor="position" className={labelClass}>Position</label>
        <select
          id="position"
          value={settings.position}
          onChange={(e) => setSettings({ ...settings, position: e.target.value as 'top' | 'bottom' })}
          className={inputClass}
        >
          <option value="bottom">Bottom of page</option>
          <option value="top">Top of page</option>
        </select>
      </div>

      <div>
        <label htmlFor="startNumber" className={labelClass}>Start Number</label>
        <input
          id="startNumber"
          type="number"
          min="1"
          value={settings.startNumber}
          onChange={(e) => setSettings({ ...settings, startNumber: parseInt(e.target.value) || 1 })}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="format" className={labelClass}>Format</label>
        <input
          id="format"
          type="text"
          value={settings.format}
          onChange={(e) => setSettings({ ...settings, format: e.target.value })}
          placeholder="Page {n}"
          className={inputClass}
        />
        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Use {'{n}'} for page number, {'{total}'} for total pages
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Adding...' : 'Add Page Numbers'}
      </button>
    </form>
  );
};

export default PageNumberOptions;
