import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';

export const OcrPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Container>
      <Heading level={1}>OCR PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Button disabled={!file}>Extract Text</Button>
    </Container>
  );
};

export default OcrPdf;
