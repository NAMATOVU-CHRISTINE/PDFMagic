import React from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { Button } from '../components/Button';

export const NotFound: React.FC = () => {
  return (
    <Container className="text-center py-20">
      <Heading level={1}>404</Heading>
      <Text className="mb-6">Page not found. The page you're looking for doesn't exist.</Text>
      <Button onClick={() => window.location.href = '/'}>Go Home</Button>
    </Container>
  );
};

export default NotFound;
