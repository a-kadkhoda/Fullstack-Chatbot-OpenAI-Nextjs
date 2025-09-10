export interface User {
  name: string;
  email: string;
}

export interface AuthSuccessResponse<T> {
  isSuccess: true;
  data: T;
  message: string;
}

export interface AuthErrorResponse {
  isSuccess: false;
  error: string;
}

export type ApiResponse<T> = AuthSuccessResponse<T> | AuthErrorResponse;

export interface AuthData {
  email: string;
  password: string;
}

export interface RegisterData extends AuthData {
  name: string;
}

export type LoginData = AuthData;
