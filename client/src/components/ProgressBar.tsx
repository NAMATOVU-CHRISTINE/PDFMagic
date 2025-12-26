import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  darkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  showLabel = true, 
  darkMode = false,
  size = 'md' 
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      <div 
        className={`w-full rounded-full overflow-hidden ${heights[size]} ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <p className={`text-sm mt-1 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {clampedProgress.toFixed(0)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
