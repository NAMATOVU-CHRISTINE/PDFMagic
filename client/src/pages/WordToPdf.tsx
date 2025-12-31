import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';
import { downloadBlob } from '../services/downloadService';

export const WordToPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/convert/word-to-pdf', { method: 'POST', body: formData });
    const blob = await response.blob();
    downloadBlob(blob, 'converted.pdf');
  };

  return (
    <Container>
      <Heading level={1}>Word to PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".doc,.docx" />
      <Button onClick={handleConvert} disabled={!file}>Convert to PDF</Button>
    </Container>
  );
};

export default WordToPdf;
