/**
 * File validation middleware
 */

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const validatePdfFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'PDF file is required' });
  }

  if (req.file.size > MAX_FILE_SIZE) {
    return res.status(400).json({ error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` });
  }

  if (req.file.mimetype !== 'application/pdf') {
    return res.status(400).json({ error: 'Only PDF files are allowed' });
  }

  next();
};

export const validateImageFiles = (req, res, next) => {
  const files = req.files || [];
  
  if (files.length === 0) {
    return res.status(400).json({ error: 'At least one image file is required' });
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: `File ${file.originalname} exceeds size limit` });
    }
    
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: `File ${file.originalname} is not a supported image type` });
    }
  }

  next();
};

export const validateMultiplePdfs = (req, res, next) => {
  const files = req.files || [];
  
  if (files.length < 2) {
    return res.status(400).json({ error: 'At least 2 PDF files are required' });
  }

  for (const file of files) {
    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({ error: `File ${file.originalname} is not a PDF` });
    }
  }

  next();
};
