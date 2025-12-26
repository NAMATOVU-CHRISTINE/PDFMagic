import React from 'react';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Component to hide content visually but keep it accessible to screen readers
 */
const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children, as: Component = 'span' }) => {
  return (
    <Component className="sr-only">
      {children}
    </Component>
  );
};

export default VisuallyHidden;
