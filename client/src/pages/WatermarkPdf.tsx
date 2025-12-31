import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const WatermarkPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');

  const handleWatermark = async () => {
    if (!file || !text) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);
    
    const response = await fetch('/api/pdf/watermark', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'watermarked.pdf';
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Add Watermark</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Input placeholder="Watermark text" value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleWatermark} disabled={!file || !text}>Add Watermark</Button>
    </Container>
  );
};

export default WatermarkPdf;
