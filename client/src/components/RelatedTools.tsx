import React from 'react';

interface Tool {
  name: string;
  path: string;
}

interface RelatedToolsProps {
  tools: Tool[];
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ tools }) => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4">Related Tools</h3>
      <div className="flex flex-wrap gap-2">
        {tools.map(tool => (
          <a key={tool.path} href={tool.path} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;
