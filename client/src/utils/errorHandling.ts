export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 0);
  }
}

export class FileProcessingError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

export const handleApiError = (error: any): AppError => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.error || error.response.data?.message || 'Server error occurred';
    return new AppError(message, error.response.status);
  } else if (error.request) {
    // Network error
    return new NetworkError('Unable to connect to server. Please check your internet connection.');
  } else {
    // Other error
    return new AppError(error.message || 'An unexpected error occurred');
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return 'An unexpected error occurred';
  }
};

export const logError = (error: unknown, context?: string): void => {
  const errorMessage = getErrorMessage(error);
  const logMessage = context ? `[${context}] ${errorMessage}` : errorMessage;
  
  console.error(logMessage);
  
  if (error instanceof Error && error.stack) {
    console.error(error.stack);
  }
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof NetworkError || 
         (error instanceof AppError && error.statusCode === 0);
};

export const isValidationError = (error: unknown): boolean => {
  return error instanceof ValidationError ||
         (error instanceof AppError && error.statusCode === 400);
};

export const isServerError = (error: unknown): boolean => {
  return error instanceof AppError && error.statusCode >= 500;
};