import Response from '../interfaces/Response';

function response(body: object, statusCode = 200, headers: object = {}): Response {
  return {
    headers,
    statusCode,
    body: JSON.stringify(body),
  };
}

function errorResponse(errMsg: string, statusCode = 500): Response {
  return response({ error: errMsg }, statusCode);
}

function invalidResponse(errMsg: string, statusCode = 400): Response {
  return response({ error: errMsg }, statusCode);
}

export {
  response,
  errorResponse,
  invalidResponse,
};
