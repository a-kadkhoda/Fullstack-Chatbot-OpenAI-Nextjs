export interface LoginSuccess {
  isSuccess: boolean;
  user: { name: string; email: string };
  message: string;
}
export interface LoginFailed {
  isSuccess: boolean;
  error: string;
}
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterSuccess {
  isSuccess: boolean;
  user: { name: string; email: string };
  message: string;
}
export interface RegisterFailed {
  isSuccess: boolean;
  error: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
