import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  darkMode?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
  darkMode = false,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-6 border ${
        darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'
      }`}
    >
      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${color} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
};

export default ToolCard;
