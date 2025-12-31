import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';
import { downloadBlob } from '../services/downloadService';

export const ImageToPdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleConvert = async () => {
    if (files.length === 0) return;
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    
    const response = await fetch('/api/convert/image-to-pdf', { method: 'POST', body: formData });
    const blob = await response.blob();
    downloadBlob(blob, 'converted.pdf');
  };

  return (
    <Container>
      <Heading level={1}>Image to PDF</Heading>
      <DropZone onFilesSelected={setFiles} multiple accept="image/*" />
      <Button onClick={handleConvert} disabled={files.length === 0}>Convert to PDF</Button>
    </Container>
  );
};

export default ImageToPdf;
