import React from 'react';

interface Metadata {
  title?: string;
  author?: string;
  pageCount?: number;
}

interface MetadataDisplayProps {
  metadata: Metadata;
}

export const MetadataDisplay: React.FC<MetadataDisplayProps> = ({ metadata }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-2">File Information</h4>
      {metadata.title && <p><span className="text-gray-500">Title:</span> {metadata.title}</p>}
      {metadata.author && <p><span className="text-gray-500">Author:</span> {metadata.author}</p>}
      {metadata.pageCount && <p><span className="text-gray-500">Pages:</span> {metadata.pageCount}</p>}
    </div>
  );
};

export default MetadataDisplay;
