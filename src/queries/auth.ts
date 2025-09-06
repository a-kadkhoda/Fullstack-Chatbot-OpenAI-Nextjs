import { instance } from "@/lib/axios";
import {
  ApiSuccessResponse,
  User,
  ApiErrorResponse,
  LoginData,
  RegisterData,
} from "@/types/auth";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const authKeys = {
  all: ["auth"],
  login: ["login"],
};

interface MutationOptions<T, E> {
  onSuccess?: (data: T) => void;
  onError?: (error: E | undefined) => void;
  onSettled?: (data: T | undefined, error: E | undefined) => void;
}

export const useLogin = (
  options?: MutationOptions<ApiSuccessResponse<User>, ApiErrorResponse>
) => {
  return useMutation<
    ApiSuccessResponse<User>,
    AxiosError<ApiErrorResponse>,
    LoginData
  >({
    mutationFn: (args) =>
      instance.post("/api/auth/login", args).then((res) => res.data),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error.response?.data);
    },
    onSettled(data, error) {
      options?.onSettled?.(data, error?.response?.data);
    },
  });
};

export const useLogout = (
  options?: MutationOptions<ApiSuccessResponse<null>, ApiErrorResponse>
) => {
  return useMutation<
    ApiSuccessResponse<null>,
    AxiosError<ApiErrorResponse>,
    void
  >({
    mutationFn: () =>
      instance.delete("/api/auth/logout").then((res) => res.data),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error.response?.data);
    },
    onSettled(data, error) {
      options?.onSettled?.(data, error?.response?.data);
    },
  });
};

export const useRegister = (
  options?: MutationOptions<ApiSuccessResponse<User>, ApiErrorResponse>
) => {
  return useMutation<
    ApiSuccessResponse<User>,
    AxiosError<ApiErrorResponse>,
    RegisterData
  >({
    mutationFn: (args) =>
      instance.post("/api/user", args).then((res) => res.data),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error.response?.data);
    },
    onSettled(data, error) {
      options?.onSettled?.(data, error?.response?.data);
    },
  });
};
