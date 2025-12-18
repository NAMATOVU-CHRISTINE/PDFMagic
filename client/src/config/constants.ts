export const APP_CONFIG = {
  name: 'PDF Tools',
  description: 'Free Online PDF Editor',
  version: '1.0.0',
  author: 'NAMATOVU-CHRISTINE',
  repository: 'https://github.com/NAMATOVU-CHRISTINE/PDFMagic'
};

export const FILE_LIMITS = {
  maxFileSize: {
    pdf: 50 * 1024 * 1024, // 50MB
    image: 10 * 1024 * 1024, // 10MB
    document: 25 * 1024 * 1024 // 25MB
  },
  maxFiles: {
    merge: 10,
    imageToPdf: 20,
    default: 1
  }
};

export const SUPPORTED_FILE_TYPES = {
  pdf: ['application/pdf'],
  image: ['image/jpeg', 'image/jpg', 'image/png'],
  document: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ]
};

export const TOOL_CONFIGS = {
  merge: {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one',
    acceptedTypes: SUPPORTED_FILE_TYPES.pdf,
    maxFiles: FILE_LIMITS.maxFiles.merge,
    maxFileSize: FILE_LIMITS.maxFileSize.pdf,
    multipleFiles: true
  },
  split: {
    title: 'Split PDF',
    description: 'Extract pages from your PDF',
    acceptedTypes: SUPPORTED_FILE_TYPES.pdf,
    maxFiles: FILE_LIMITS.maxFiles.default,
    maxFileSize: FILE_LIMITS.maxFileSize.pdf,
    multipleFiles: false
  },
  compress: {
    title: 'Compress PDF',
    description: 'Reduce file size while optimizing for maximal PDF quality',
    acceptedTypes: SUPPORTED_FILE_TYPES.pdf,
    maxFiles: FILE_LIMITS.maxFiles.default,
    maxFileSize: FILE_LIMITS.maxFileSize.pdf,
    multipleFiles: false
  },
  rotate: {
    title: 'Rotate PDF',
    description: 'Rotate your PDF pages to the right orientation',
    acceptedTypes: SUPPORTED_FILE_TYPES.pdf,
    maxFiles: FILE_LIMITS.maxFiles.default,
    maxFileSize: FILE_LIMITS.maxFileSize.pdf,
    multipleFiles: false
  },
  protect: {
    title: 'Protect PDF',
    description: 'Protect your PDF with a password',
    acceptedTypes: SUPPORTED_FILE_TYPES.pdf,
    maxFiles: FILE_LIMITS.maxFiles.default,
    maxFileSize: FILE_LIMITS.maxFileSize.pdf,
    multipleFiles: false
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG image',
    acceptedTypes: SUPPORTED_FILE_TYPES.pdf,
    maxFiles: FILE_LIMITS.maxFiles.default,
    maxFileSize: FILE_LIMITS.maxFileSize.pdf,
    multipleFiles: false
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF',
    description: 'Convert JPG images to PDF format',
    acceptedTypes: SUPPORTED_FILE_TYPES.image,
    maxFiles: FILE_LIMITS.maxFiles.imageToPdf,
    maxFileSize: FILE_LIMITS.maxFileSize.image,
    multipleFiles: true
  },
  'word-to-pdf': {
    title: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    acceptedTypes: SUPPORTED_FILE_TYPES.document,
    maxFiles: FILE_LIMITS.maxFiles.default,
    maxFileSize: FILE_LIMITS.maxFileSize.document,
    multipleFiles: false
  }
};

export const API_ENDPOINTS = {
  health: '/api/health',
  merge: '/api/merge',
  split: '/api/split',
  compress: '/api/compress',
  rotate: '/api/rotate',
  protect: '/api/protect',
  pdfToJpg: '/api/pdf-to-jpg',
  jpgToPdf: '/api/jpg-to-pdf',
  wordToPdf: '/api/word-to-pdf',
  download: '/api/download'
};

export const UI_MESSAGES = {
  dragAndDrop: 'Drag and drop files here, or click to select',
  processing: 'Processing your files...',
  success: 'Files processed successfully!',
  error: 'An error occurred while processing your files',
  fileTooBig: 'File size exceeds the maximum limit',
  invalidFileType: 'Invalid file type',
  tooManyFiles: 'Too many files selected',
  noFilesSelected: 'Please select files to process'
};