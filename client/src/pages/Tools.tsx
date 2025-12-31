import React from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { ToolCard } from '../components/ToolCard';

const tools = [
  { name: 'Merge PDF', path: '/merge', description: 'Combine multiple PDFs' },
  { name: 'Split PDF', path: '/split', description: 'Extract pages from PDF' },
  { name: 'Compress PDF', path: '/compress', description: 'Reduce file size' },
  { name: 'Convert PDF', path: '/convert', description: 'Convert to other formats' },
];

export const Tools: React.FC = () => {
  return (
    <Container>
      <Heading level={1}>All PDF Tools</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => <ToolCard key={tool.path} {...tool} />)}
      </div>
    </Container>
  );
};

export default Tools;
