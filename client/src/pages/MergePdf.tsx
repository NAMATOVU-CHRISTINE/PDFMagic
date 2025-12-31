import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Button } from '../components/Button';

export const MergePdf: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleMerge = async () => {
    if (files.length < 2) return;
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    const response = await fetch('/api/pdf/merge', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged.pdf';
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Merge PDF Files</Heading>
      <DropZone onFilesSelected={setFiles} multiple accept=".pdf" />
      <Button onClick={handleMerge} disabled={files.length < 2}>Merge PDFs</Button>
    </Container>
  );
};

export default MergePdf;
