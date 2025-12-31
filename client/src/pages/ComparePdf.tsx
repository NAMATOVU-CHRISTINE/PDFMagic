import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';

export const ComparePdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <Container>
      <Heading level={1}>Compare PDFs</Heading>
      <DropZone onFilesSelected={setFiles} multiple accept=".pdf" />
      <Button disabled={files.length < 2}>Compare PDFs</Button>
    </Container>
  );
};

export default ComparePdf;
