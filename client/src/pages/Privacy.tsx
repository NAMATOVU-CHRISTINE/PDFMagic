import React from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';

export const Privacy: React.FC = () => {
  return (
    <Container>
      <Heading level={1}>Privacy Policy</Heading>
      <Text>Your privacy is important to us. All uploaded files are processed securely and deleted automatically after processing.</Text>
      <Heading level={2}>Data Collection</Heading>
      <Text>We do not store your files permanently. All uploads are deleted within 1 hour of processing.</Text>
    </Container>
  );
};

export default Privacy;
