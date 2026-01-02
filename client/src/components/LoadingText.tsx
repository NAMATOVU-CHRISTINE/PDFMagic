import React from 'react';

interface LoadingTextProps {
  text?: string;
}

export const LoadingText: React.FC<LoadingTextProps> = ({ text = 'Loading...' }) => {
  return <span className="text-gray-500 animate-pulse">{text}</span>;
};

export default LoadingText;
