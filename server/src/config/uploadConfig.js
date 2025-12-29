const uploadConfig = {
  maxFileSize: 50 * 1024 * 1024,
  allowedMimeTypes: ['application/pdf'],
  uploadDir: 'uploads',
  preserveExtension: true,
  createUniqueFilename: true,
};

module.exports = uploadConfig;
