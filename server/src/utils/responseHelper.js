/**
 * Response helper utilities
 */

export const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const errorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export const downloadResponse = async (res, filePath, filename, cleanup) => {
  return new Promise((resolve, reject) => {
    res.download(filePath, filename, async (err) => {
      if (err) {
        reject(err);
      } else {
        if (cleanup) {
          await cleanup();
        }
        resolve();
      }
    });
  });
};
