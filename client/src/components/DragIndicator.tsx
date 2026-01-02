import React from 'react';

interface DragIndicatorProps {
  isDragging: boolean;
}

export const DragIndicator: React.FC<DragIndicatorProps> = ({ isDragging }) => {
  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 bg-blue-500/20 border-4 border-dashed border-blue-500 z-50 flex items-center justify-center">
      <p className="text-2xl font-semibold text-blue-600">Drop files here</p>
    </div>
  );
};

export default DragIndicator;
