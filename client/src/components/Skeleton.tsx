import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  circle?: boolean;
  darkMode?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '1rem', rounded = true, circle = false, darkMode = false }) => {
  const bgClass = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  const radiusClass = circle ? 'rounded-full' : rounded ? 'rounded' : '';

  return (
    <div 
      className={`animate-pulse ${bgClass} ${radiusClass}`} 
      style={{ width: circle ? height : width, height }}
    />
  );
};

export default Skeleton;
