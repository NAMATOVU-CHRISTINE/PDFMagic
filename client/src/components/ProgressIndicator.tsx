import React from 'react';

interface ProgressIndicatorProps {
  progress: number;
  showLabel?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, showLabel = true }) => {
  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
      </div>
      {showLabel && <p className="text-sm text-gray-500 mt-1 text-center">{progress}%</p>}
    </div>
  );
};

export default ProgressIndicator;
