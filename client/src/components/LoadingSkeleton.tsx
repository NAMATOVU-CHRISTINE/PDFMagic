import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  darkMode?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 8, darkMode = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`rounded-lg p-6 border animate-pulse ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
          }`}
        >
          <div className={`w-14 h-14 rounded-lg mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-5 rounded mb-2 w-3/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-4 rounded w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          <div className={`h-4 rounded w-2/3 mt-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
