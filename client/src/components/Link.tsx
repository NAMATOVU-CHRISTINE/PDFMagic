import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  darkMode?: boolean;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, external = false, darkMode = false, className = '' }) => {
  const colorClass = darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800';
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={`${colorClass} underline ${className}`} {...props}>
      {children}
    </a>
  );
};

export default Link;
