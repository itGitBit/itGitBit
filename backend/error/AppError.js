class AppError extends Error {
  constructor(errorType, message, statusCode, isOperational) {
    super(message);
    this.errorType = errorType;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
export default AppError;
