import React from 'react';

interface PreviewPanelProps {
  children: React.ReactNode;
  title?: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ children, title = 'Preview' }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-semibold">{title}</div>
      <div className="p-4 bg-gray-50 min-h-[300px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default PreviewPanel;
