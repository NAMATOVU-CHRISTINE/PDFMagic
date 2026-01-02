import React from 'react';

interface WarningBoxProps {
  children: React.ReactNode;
}

export const WarningBox: React.FC<WarningBoxProps> = ({ children }) => {
  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
      <span className="mr-2">⚠️</span>{children}
    </div>
  );
};

export default WarningBox;
