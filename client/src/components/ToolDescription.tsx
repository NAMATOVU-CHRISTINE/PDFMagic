import React from 'react';

interface ToolDescriptionProps {
  title: string;
  description: string;
  features?: string[];
}

export const ToolDescription: React.FC<ToolDescriptionProps> = ({ title, description, features }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      {features && (
        <ul className="list-disc list-inside text-gray-600">
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}
    </div>
  );
};

export default ToolDescription;
