import React from 'react';

interface ErrorBoxProps {
  children: React.ReactNode;
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ children }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
      <span className="mr-2">✗</span>{children}
    </div>
  );
};

export default ErrorBox;
