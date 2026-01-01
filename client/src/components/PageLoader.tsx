import React from 'react';
import { Spinner } from './Spinner';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default PageLoader;
