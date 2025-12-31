import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Select } from '../components/Select';
import { Button } from '../components/Button';

export const CompressPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState('medium');

  const handleCompress = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality);
    
    const response = await fetch('/api/pdf/compress', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'compressed.pdf';
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Compress PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Select value={quality} onChange={(e) => setQuality(e.target.value)}>
        <option value="low">Low (smaller file)</option>
        <option value="medium">Medium</option>
        <option value="high">High (better quality)</option>
      </Select>
      <Button onClick={handleCompress} disabled={!file}>Compress PDF</Button>
    </Container>
  );
};

export default CompressPdf;
