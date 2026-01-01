import React from 'react';
import { PagePreview } from './PagePreview';

interface PageGridProps {
  totalPages: number;
  selectedPages: number[];
  onToggle: (page: number) => void;
}

export const PageGrid: React.FC<PageGridProps> = ({ totalPages, selectedPages, onToggle }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <PagePreview key={i} pageNumber={i + 1} selected={selectedPages.includes(i + 1)} onClick={() => onToggle(i + 1)} />
      ))}
    </div>
  );
};

export default PageGrid;
