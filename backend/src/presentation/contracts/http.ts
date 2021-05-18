export interface HttpRequest<T = any> {
  body: T;
  headers: any;
  params: any;
}

export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}

export type HttpResponseError = {
  error: string;
};

export const ok = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body,
});

export const created = <T = any>(body: T): HttpResponse<T> => ({
  statusCode: 201,
  body,
});

export const badRequest = (error: Error): HttpResponse<HttpResponseError> => ({
  statusCode: 400,
  body: { error: error.message },
});

export const unauthorized = (
  error: Error
): HttpResponse<HttpResponseError> => ({
  statusCode: 401,
  body: { error: error.message },
});

export const serverError = (error: Error): HttpResponse<HttpResponseError> => {
  console.log(error);

  return {
    statusCode: 500,
    body: { error: error.message },
  };
};
