import React from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';

export const Terms: React.FC = () => {
  return (
    <Container>
      <Heading level={1}>Terms of Service</Heading>
      <Text>By using PDFMagic, you agree to these terms of service.</Text>
      <Heading level={2}>Usage</Heading>
      <Text>This service is provided free of charge for personal and commercial use.</Text>
    </Container>
  );
};

export default Terms;
