import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Select } from '../components/Select';
import { Button } from '../components/Button';

export const RotatePdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState('90');

  const handleRotate = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('rotation', rotation);
    
    const response = await fetch('/api/pdf/rotate', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rotated.pdf';
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Rotate PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Select value={rotation} onChange={(e) => setRotation(e.target.value)}>
        <option value="90">90° Clockwise</option>
        <option value="180">180°</option>
        <option value="270">90° Counter-clockwise</option>
      </Select>
      <Button onClick={handleRotate} disabled={!file}>Rotate PDF</Button>
    </Container>
  );
};

export default RotatePdf;
