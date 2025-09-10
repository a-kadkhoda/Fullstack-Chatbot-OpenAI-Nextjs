import { instance } from "@/lib/axios";
import {
  AuthSuccessResponse,
  User,
  AuthErrorResponse,
  LoginData,
  RegisterData,
} from "@/types/queries/auth";
import { MutationOptions } from "@/types/queries/queries";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const authKeys = {
  all: ["auth"],
  login: ["login"],
};

export const useLogin = (
  options?: MutationOptions<AuthSuccessResponse<User>, AuthErrorResponse>
) => {
  return useMutation<
    AuthSuccessResponse<User>,
    AxiosError<AuthErrorResponse>,
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
  options?: MutationOptions<AuthSuccessResponse<null>, AuthErrorResponse>
) => {
  return useMutation<
    AuthSuccessResponse<null>,
    AxiosError<AuthErrorResponse>,
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
  options?: MutationOptions<AuthSuccessResponse<User>, AuthErrorResponse>
) => {
  return useMutation<
    AuthSuccessResponse<User>,
    AxiosError<AuthErrorResponse>,
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
