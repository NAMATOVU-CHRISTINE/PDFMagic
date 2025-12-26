import React from 'react';

interface SkipLinkProps {
  targetId: string;
  children?: React.ReactNode;
}

const SkipLink: React.FC<SkipLinkProps> = ({ targetId, children = 'Skip to main content' }) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {children}
    </a>
  );
};

export default SkipLink;
