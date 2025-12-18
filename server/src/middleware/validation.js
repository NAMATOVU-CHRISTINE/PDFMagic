import { body, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

export const validateFileUpload = (req, res, next) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      error: 'No files uploaded'
    });
  }
  
  // Check file size limits
  const maxSize = 50 * 1024 * 1024; // 50MB
  const files = req.files || [req.file];
  
  for (const file of files) {
    if (file.size > maxSize) {
      return res.status(400).json({
        error: `File ${file.originalname} exceeds maximum size of 50MB`
      });
    }
  }
  
  next();
};

export const validatePDFFile = (req, res, next) => {
  const files = req.files || [req.file];
  
  for (const file of files) {
    if (file.mimetype !== 'application/pdf') {
      return res.status(400).json({
        error: `File ${file.originalname} is not a valid PDF file`
      });
    }
  }
  
  next();
};

export const validateImageFile = (req, res, next) => {
  const files = req.files || [req.file];
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  for (const file of files) {
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        error: `File ${file.originalname} is not a valid image file`
      });
    }
  }
  
  next();
};

export const rateLimitValidation = (req, res, next) => {
  // Simple rate limiting - in production, use redis or similar
  const clientIP = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;
  
  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map();
  }
  
  const clientData = global.rateLimitStore.get(clientIP) || { count: 0, resetTime: now + windowMs };
  
  if (now > clientData.resetTime) {
    clientData.count = 0;
    clientData.resetTime = now + windowMs;
  }
  
  if (clientData.count >= maxRequests) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.'
    });
  }
  
  clientData.count++;
  global.rateLimitStore.set(clientIP, clientData);
  
  next();
};