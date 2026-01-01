import React from 'react';

interface ToolHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ title, description, icon }) => {
  return (
    <div className="text-center mb-8">
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default ToolHeader;
