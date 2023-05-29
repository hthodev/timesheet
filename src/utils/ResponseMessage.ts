export class ResponseMessage {
  result: object | null;
  targetUrl: object | null;
  success: boolean;
  error: object | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;

  constructor(
    result: any | null = {},
    targetUrl: object | null = null,
    success: boolean = true,
    error: object | null = null,
    unAuthorizedRequest: boolean = false,
    __abp: boolean = true
  ) {
    this.result = result;
    this.targetUrl = targetUrl;
    this.success = success;
    this.error = error;
    this.unAuthorizedRequest = unAuthorizedRequest;
    this.__abp = __abp;
  }
}

export class errorMessage {
  code: number | null = 0;
  message: string | null;
  details: string | null;
  validationErrors: string | null;
  constructor(
    code: number | null,
    message: string | null,
    details: string | null,
    validationErrors: string | null
  ) {
    this.code = code;
    this.message = message;
    this.details = details;
    this.validationErrors = validationErrors;
  }
}
