import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { downloadBlob } from '../services/downloadService';

export const PdfToImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState('jpg');

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    
    const response = await fetch('/api/convert', { method: 'POST', body: formData });
    const blob = await response.blob();
    downloadBlob(blob, `converted.${format}`);
  };

  return (
    <Container>
      <Heading level={1}>PDF to Image</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="jpg">JPG</option>
        <option value="png">PNG</option>
      </Select>
      <Button onClick={handleConvert} disabled={!file}>Convert to Image</Button>
    </Container>
  );
};

export default PdfToImage;
