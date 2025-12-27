import React from 'react';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className = '' }) => {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
};

export default FormGroup;
