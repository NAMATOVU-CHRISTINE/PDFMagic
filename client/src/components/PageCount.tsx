import React from 'react';

interface PageCountProps {
  count: number;
}

export const PageCount: React.FC<PageCountProps> = ({ count }) => {
  return (
    <span className="text-gray-500">
      {count} {count === 1 ? 'page' : 'pages'}
    </span>
  );
};

export default PageCount;
