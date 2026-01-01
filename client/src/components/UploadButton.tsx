import React, { useRef } from 'react';
import { Button } from './Button';

interface UploadButtonProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onUpload, accept = '.pdf', multiple, children }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button onClick={() => inputRef.current?.click()}>{children || 'Upload File'}</Button>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => onUpload(Array.from(e.target.files || []))} className="hidden" />
    </>
  );
};

export default UploadButton;
