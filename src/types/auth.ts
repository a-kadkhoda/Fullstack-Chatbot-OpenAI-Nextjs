export interface User {
  name: string;
  email: string;
}

export interface ApiSuccessResponse<T> {
  isSuccess: true;
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  isSuccess: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthData {
  name: string;
}

export type LoginData = AuthData;
