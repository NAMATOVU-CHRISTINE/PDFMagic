import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';

export const EditPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Container>
      <Heading level={1}>Edit PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Button disabled={!file}>Open Editor</Button>
    </Container>
  );
};

export default EditPdf;
