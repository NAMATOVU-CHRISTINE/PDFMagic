module.exports = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_FILE_TYPES: ['pdf'],
  UPLOAD_DIR: 'uploads',
  OUTPUT_DIR: 'output',
  TEMP_DIR: 'temp',
  FILE_CLEANUP_INTERVAL: 60 * 60 * 1000, // 1 hour
  FILE_MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: 100,
};
