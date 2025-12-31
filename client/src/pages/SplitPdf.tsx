import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SplitPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('');

  const handleSplit = async () => {
    if (!file || !pages) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pages', pages);
    
    const response = await fetch('/api/pdf/split', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'split.pdf';
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Split PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Input placeholder="Page ranges (e.g., 1-3, 5, 7-10)" value={pages} onChange={(e) => setPages(e.target.value)} />
      <Button onClick={handleSplit} disabled={!file || !pages}>Split PDF</Button>
    </Container>
  );
};

export default SplitPdf;
