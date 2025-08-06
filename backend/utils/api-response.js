class ApiResponse {
  constructor(statusCode, message = "Success", data = {}) {
    this.message = message;
    this.statusCode = statusCode ?? 200;
    this.success = statusCode < 400;
    this.data = data;
  }
}

export { ApiResponse };
