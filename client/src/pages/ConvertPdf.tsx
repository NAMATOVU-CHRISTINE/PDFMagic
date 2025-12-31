import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Select } from '../components/Select';
import { Button } from '../components/Button';

export const ConvertPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState('jpg');

  const handleConvert = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);
    
    const response = await fetch('/api/pdf/convert', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${format}`;
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Convert PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="jpg">JPG Images</option>
        <option value="png">PNG Images</option>
        <option value="docx">Word Document</option>
      </Select>
      <Button onClick={handleConvert} disabled={!file}>Convert PDF</Button>
    </Container>
  );
};

export default ConvertPdf;
