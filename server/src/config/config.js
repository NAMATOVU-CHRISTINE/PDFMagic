export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // File upload limits
  upload: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 20,
    allowedPdfTypes: ['application/pdf'],
    allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png'],
    allowedDocTypes: [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ]
  },
  
  // File cleanup
  cleanup: {
    tempFileLifetime: 60 * 60 * 1000, // 1 hour
    cleanupInterval: 15 * 60 * 1000 // 15 minutes
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  },
  
  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
  },
  
  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    directory: 'logs'
  }
};

export default config;