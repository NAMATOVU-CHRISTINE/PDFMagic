import React from 'react';

interface SuccessBoxProps {
  children: React.ReactNode;
}

export const SuccessBox: React.FC<SuccessBoxProps> = ({ children }) => {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
      <span className="mr-2">✓</span>{children}
    </div>
  );
};

export default SuccessBox;
