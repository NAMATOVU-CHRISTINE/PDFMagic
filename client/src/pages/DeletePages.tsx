import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const DeletePages: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('');

  return (
    <Container>
      <Heading level={1}>Delete PDF Pages</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Input placeholder="Pages to delete (e.g., 1,3,5-7)" value={pages} onChange={(e) => setPages(e.target.value)} />
      <Button disabled={!file || !pages}>Delete Pages</Button>
    </Container>
  );
};

export default DeletePages;
