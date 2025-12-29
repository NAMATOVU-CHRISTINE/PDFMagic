const mimeTypes = {
  pdf: 'application/pdf',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  json: 'application/json',
};

const getMimeType = (extension) => {
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
};

module.exports = { mimeTypes, getMimeType };
