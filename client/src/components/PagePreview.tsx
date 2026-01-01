import React from 'react';

interface PagePreviewProps {
  pageNumber: number;
  selected?: boolean;
  onClick?: () => void;
}

export const PagePreview: React.FC<PagePreviewProps> = ({ pageNumber, selected, onClick }) => {
  return (
    <div onClick={onClick}
      className={`w-24 h-32 border-2 rounded flex items-center justify-center cursor-pointer ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <span className="text-gray-500">{pageNumber}</span>
    </div>
  );
};

export default PagePreview;
