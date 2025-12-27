import {
  Merge,
  Split,
  Minimize2,
  RotateCw,
  Lock,
  FileImage,
  FileDown,
  Edit,
  FileSpreadsheet,
  Droplet,
  Unlock,
  Scissors,
  ScanLine,
  PenTool,
  Images,
  FileText,
} from 'lucide-react';

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  category: string;
}

export const tools: Tool[] = [
  {
    id: 'merge',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one',
    icon: Merge,
    color: 'bg-blue-500',
    category: 'organize',
  },
  {
    id: 'split',
    title: 'Split PDF',
    description: 'Extract pages from your PDF',
    icon: Split,
    color: 'bg-green-500',
    category: 'organize',
  },
  {
    id: 'compress',
    title: 'Compress PDF',
    description: 'Reduce file size while maintaining quality',
    icon: Minimize2,
    color: 'bg-purple-500',
    category: 'optimize',
  },
  {
    id: 'rotate',
    title: 'Rotate PDF',
    description: 'Rotate your PDF pages',
    icon: RotateCw,
    color: 'bg-orange-500',
    category: 'organize',
  },
  {
    id: 'protect',
    title: 'Protect PDF',
    description: 'Add password protection to your PDF',
    icon: Lock,
    color: 'bg-red-500',
    category: 'security',
  },
  {
    id: 'watermark',
    title: 'Watermark',
    description: 'Add watermark text to your PDF',
    icon: Droplet,
    color: 'bg-cyan-500',
    category: 'security',
  },
  {
    id: 'edit-pdf',
    title: 'Edit PDF',
    description: 'Add text to your PDF document',
    icon: Edit,
    color: 'bg-pink-500',
    category: 'organize',
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert PDF pages to images',
    icon: FileImage,
    color: 'bg-indigo-500',
    category: 'convert',
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert images to PDF format',
    icon: FileDown,
    color: 'bg-teal-500',
    category: 'convert',
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert Word documents to PDF',
    icon: FileText,
    color: 'bg-blue-600',
    category: 'convert',
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Extract text from PDF',
    icon: FileText,
    color: 'bg-blue-400',
    category: 'convert',
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Convert PDF to spreadsheet',
    icon: FileSpreadsheet,
    color: 'bg-green-600',
    category: 'convert',
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove password from PDF',
    icon: Unlock,
    color: 'bg-yellow-500',
    category: 'security',
  },
  {
    id: 'extract-pages',
    title: 'Extract Pages',
    description: 'Select and extract specific pages',
    icon: Scissors,
    color: 'bg-rose-500',
    category: 'organize',
  },
  {
    id: 'ocr',
    title: 'OCR',
    description: 'Extract text from scanned PDFs',
    icon: ScanLine,
    color: 'bg-amber-500',
    category: 'convert',
  },
  {
    id: 'sign-pdf',
    title: 'Sign PDF',
    description: 'Add signature to your PDF',
    icon: PenTool,
    color: 'bg-violet-500',
    category: 'security',
  },
  {
    id: 'images-to-pdf',
    title: 'Images to PDF',
    description: 'Convert multiple images to PDF',
    icon: Images,
    color: 'bg-emerald-500',
    category: 'convert',
  },
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'organize', label: 'Organize PDF' },
  { id: 'optimize', label: 'Optimize PDF' },
  { id: 'convert', label: 'Convert PDF' },
  { id: 'security', label: 'PDF Security' },
];

export const getToolById = (id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): Tool[] => {
  if (category === 'all') return tools;
  return tools.filter(tool => tool.category === category);
};
