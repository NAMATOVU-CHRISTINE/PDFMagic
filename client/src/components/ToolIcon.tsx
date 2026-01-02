import React from 'react';

interface ToolIconProps {
  tool: string;
  size?: number;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ tool, size = 32 }) => {
  const icons: Record<string, string> = {
    merge: '🔗', split: '✂️', compress: '📦', convert: '🔄',
    rotate: '🔃', watermark: '💧', protect: '🔒', unlock: '🔓',
  };
  return <span style={{ fontSize: size }}>{icons[tool] || '📄'}</span>;
};

export default ToolIcon;
