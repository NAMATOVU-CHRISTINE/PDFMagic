export interface Category {
  id: string;
  label: string;
  description?: string;
}

export const categories: Category[] = [
  { 
    id: 'all', 
    label: 'All Tools',
    description: 'View all available PDF tools'
  },
  { 
    id: 'organize', 
    label: 'Organize PDF',
    description: 'Merge, split, rotate, and organize your PDFs'
  },
  { 
    id: 'optimize', 
    label: 'Optimize PDF',
    description: 'Compress and optimize PDF file size'
  },
  { 
    id: 'convert', 
    label: 'Convert PDF',
    description: 'Convert PDFs to and from other formats'
  },
  { 
    id: 'security', 
    label: 'PDF Security',
    description: 'Protect, unlock, and sign your PDFs'
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};
