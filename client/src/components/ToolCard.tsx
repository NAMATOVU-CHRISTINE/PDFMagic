import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const Icon = tool.icon;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-200"
    >
      <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
      <p className="text-gray-600">{tool.description}</p>
    </div>
  );
};

export default ToolCard;