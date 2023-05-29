export class ApiError extends Error {
  validation: string;
  details: string;
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public isOperational: Boolean = true,
    details: string | null = null,
    validation: string | null = null
  ) {
    super(message);
    if (validation || details) {
      this.details = details;
      this.validation = validation;
    } else {
      Error.captureStackTrace(this);
    }
  }
}
