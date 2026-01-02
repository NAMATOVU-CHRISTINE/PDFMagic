import React from 'react';

interface EmptyMessageProps {
  icon?: string;
  title: string;
  description?: string;
}

export const EmptyMessage: React.FC<EmptyMessageProps> = ({ icon = '📄', title, description }) => {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      {description && <p className="text-gray-500 mt-2">{description}</p>}
    </div>
  );
};

export default EmptyMessage;
