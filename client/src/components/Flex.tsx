import React from 'react';

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  wrap?: boolean;
  className?: string;
}

const Flex: React.FC<FlexProps> = ({ children, direction = 'row', justify = 'start', align = 'start', gap = 'md', wrap = false, className = '' }) => {
  const dirs = { row: 'flex-row', col: 'flex-col' };
  const justs = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' };
  const aligns = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' };
  const gaps = { none: '', sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };

  return (
    <div className={`flex ${dirs[direction]} ${justs[justify]} ${aligns[align]} ${gaps[gap]} ${wrap ? 'flex-wrap' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Flex;
