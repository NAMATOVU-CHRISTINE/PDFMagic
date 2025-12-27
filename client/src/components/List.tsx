import React from 'react';

interface ListProps {
  items: string[];
  ordered?: boolean;
  darkMode?: boolean;
}

const List: React.FC<ListProps> = ({ items, ordered = false, darkMode = false }) => {
  const Tag = ordered ? 'ol' : 'ul';
  const listStyle = ordered ? 'list-decimal' : 'list-disc';
  const colorClass = darkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <Tag className={`${listStyle} list-inside space-y-1 ${colorClass}`}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  );
};

export default List;
