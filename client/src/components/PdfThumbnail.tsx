import React, { useEffect, useState, useRef } from 'react';
import { FileText } from 'lucide-react';

interface PdfThumbnailProps {
  file: File;
  width?: number;
  height?: number;
}

const PdfThumbnail: React.FC<PdfThumbnailProps> = ({ file, width = 80, height = 100 }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateThumbnail = async () => {
      if (file.type !== 'application/pdf') {
        // For images, create thumbnail directly
        if (file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          setThumbnail(url);
          setLoading(false);
          return;
        }
        setLoading(false);
        return;
      }

      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (context) {
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;
          
          setThumbnail(canvas.toDataURL());
        }
      } catch (error) {
        console.error('Error generating thumbnail:', error);
      } finally {
        setLoading(false);
      }
    };

    generateThumbnail();
  }, [file]);

  if (loading) {
    return (
      <div 
        className="bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center animate-pulse"
        style={{ width, height }}
      >
        <FileText className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  if (thumbnail) {
    return (
      <img
        src={thumbnail}
        alt={file.name}
        className="rounded object-cover border border-gray-200 dark:border-gray-600"
        style={{ width, height }}
      />
    );
  }

  return (
    <div 
      className="bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center"
      style={{ width, height }}
    >
      <FileText className="h-6 w-6 text-red-500" />
    </div>
  );
};

export default PdfThumbnail;
