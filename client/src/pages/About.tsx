import React from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';

export const About: React.FC = () => {
  return (
    <Container>
      <Heading level={1}>About PDFMagic</Heading>
      <Text>
        PDFMagic is a free online tool that helps you work with PDF files easily.
        Merge, split, compress, and convert your PDFs without any hassle.
      </Text>
      <Heading level={2}>Our Mission</Heading>
      <Text>
        We believe working with PDFs should be simple and accessible to everyone.
        No sign-ups, no fees, just powerful PDF tools at your fingertips.
      </Text>
    </Container>
  );
};

export default About;
