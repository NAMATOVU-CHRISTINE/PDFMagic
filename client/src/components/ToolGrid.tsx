import React from 'react';
import { ToolCard } from './ToolCard';

interface Tool {
  name: string;
  path: string;
  description: string;
  icon?: string;
}

interface ToolGridProps {
  tools: Tool[];
}

export const ToolGrid: React.FC<ToolGridProps> = ({ tools }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map(tool => <ToolCard key={tool.path} {...tool} />)}
    </div>
  );
};

export default ToolGrid;
