import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const ProtectPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');

  const handleProtect = async () => {
    if (!file || !password) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);
    
    const response = await fetch('/api/pdf/protect', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'protected.pdf';
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Protect PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleProtect} disabled={!file || !password}>Protect PDF</Button>
    </Container>
  );
};

export default ProtectPdf;
