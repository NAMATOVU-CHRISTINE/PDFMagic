import React from 'react';

interface RequiredLabelProps {
  children: React.ReactNode;
}

export const RequiredLabel: React.FC<RequiredLabelProps> = ({ children }) => {
  return (
    <label className="block font-medium mb-1">
      {children} <span className="text-red-500">*</span>
    </label>
  );
};

export default RequiredLabel;
