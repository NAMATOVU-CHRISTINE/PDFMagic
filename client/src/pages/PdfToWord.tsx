import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';
import { downloadBlob } from '../services/downloadService';

export const PdfToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', 'docx');
    
    const response = await fetch('/api/convert', { method: 'POST', body: formData });
    const blob = await response.blob();
    downloadBlob(blob, 'converted.docx');
  };

  return (
    <Container>
      <Heading level={1}>PDF to Word</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Button onClick={handleConvert} disabled={!file}>Convert to Word</Button>
    </Container>
  );
};

export default PdfToWord;
