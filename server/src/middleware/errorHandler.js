export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'File too large. Maximum size is 50MB.'
    });
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      error: 'Too many files. Maximum is 20 files.'
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      error: 'Unexpected file field.'
    });
  }

  // PDF processing errors
  if (err.message && err.message.includes('PDF')) {
    return res.status(422).json({
      error: 'PDF processing failed: ' + err.message
    });
  }

  // File system errors
  if (err.code === 'ENOENT') {
    return res.status(404).json({
      error: 'File not found.'
    });
  }

  if (err.code === 'EACCES') {
    return res.status(403).json({
      error: 'Permission denied.'
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal server error. Please try again later.'
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
};

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};