import React from 'react';

interface OptionCardProps {
  title: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({ title, description, selected, onClick }) => {
  return (
    <button onClick={onClick}
      className={`p-4 rounded-lg border-2 text-left w-full ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
      <div className="font-semibold">{title}</div>
      {description && <div className="text-sm text-gray-500">{description}</div>}
    </button>
  );
};

export default OptionCard;
