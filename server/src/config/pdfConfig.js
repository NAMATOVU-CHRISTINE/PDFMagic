const pdfConfig = {
  maxPages: 500,
  maxFileSize: 50 * 1024 * 1024,
  compressionQuality: 0.8,
  defaultDPI: 150,
  supportedFormats: ['pdf', 'png', 'jpg'],
};

module.exports = pdfConfig;
