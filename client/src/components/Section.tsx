import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  darkMode = false,
  padding = 'md'
}) => {
  const paddings = {
    none: '',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-16',
  };

  return (
    <section className={`${paddings[padding]} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
