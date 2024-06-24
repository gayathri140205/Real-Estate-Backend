export const errorHandler = (statusCode, message) => {
    const error = new Error(message);  // Set the message directly during the Error creation
    error.statusCode = statusCode;
    return error;
  };
  