import React from 'react';

interface ToolBadgeProps {
  label: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export const ToolBadge: React.FC<ToolBadgeProps> = ({ label, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
  };

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[color]}`}>{label}</span>;
};

export default ToolBadge;
