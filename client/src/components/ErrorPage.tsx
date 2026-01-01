import React from 'react';
import { Container } from './Container';
import { Button } from './Button';

interface ErrorPageProps {
  code?: number;
  message?: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ code = 500, message = 'Something went wrong' }) => {
  return (
    <Container className="text-center py-20">
      <h1 className="text-6xl font-bold text-red-500">{code}</h1>
      <p className="text-xl mt-4 mb-8">{message}</p>
      <Button onClick={() => window.location.href = '/'}>Go Home</Button>
    </Container>
  );
};

export default ErrorPage;
