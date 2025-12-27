import React from 'react';

interface CodeProps {
  children: string;
  block?: boolean;
  darkMode?: boolean;
}

const Code: React.FC<CodeProps> = ({ children, block = false, darkMode = false }) => {
  const bgClass = darkMode ? 'bg-gray-700' : 'bg-gray-100';
  const textClass = darkMode ? 'text-gray-200' : 'text-gray-800';

  if (block) {
    return (
      <pre className={`${bgClass} ${textClass} p-4 rounded-lg overflow-x-auto`}>
        <code>{children}</code>
      </pre>
    );
  }

  return <code className={`${bgClass} ${textClass} px-1.5 py-0.5 rounded text-sm font-mono`}>{children}</code>;
};

export default Code;
