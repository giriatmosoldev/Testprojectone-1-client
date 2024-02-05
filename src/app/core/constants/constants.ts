export const CookieTokenKey: string = "userToken";
export const CookieUserKey: string = "userDetails";

export enum StatusCode {
  Unauthorized = 401,
  BadRequest = 400,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  InternalServerError = 500,
  ServiceUnavaiable = 503,
  BadGateway = 502,
}
