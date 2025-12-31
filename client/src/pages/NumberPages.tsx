import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';

export const NumberPages: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Container>
      <Heading level={1}>Add Page Numbers</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Button disabled={!file}>Add Page Numbers</Button>
    </Container>
  );
};

export default NumberPages;
