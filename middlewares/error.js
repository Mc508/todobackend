class ErrorHandler extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

export const ErrorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal error";
  return res.status(404).json({
    success: false,
    message: err.message
  });
};

export default ErrorHandler;
