import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Heading } from '../components/Heading';
import { DropZone } from '../components/DropZone';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const UnlockPdf: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');

  const handleUnlock = async () => {
    if (!file || !password) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);
    
    const response = await fetch('/api/pdf/unlock', { method: 'POST', body: formData });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unlocked.pdf';
    a.click();
  };

  return (
    <Container>
      <Heading level={1}>Unlock PDF</Heading>
      <DropZone onFilesSelected={(files) => setFile(files[0])} accept=".pdf" />
      <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleUnlock} disabled={!file || !password}>Unlock PDF</Button>
    </Container>
  );
};

export default UnlockPdf;
