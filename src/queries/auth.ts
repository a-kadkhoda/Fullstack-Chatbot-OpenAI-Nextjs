import { instance } from "@/lib/axios";
import {
  LoginData,
  LoginFailed,
  LoginSuccess,
  RegisterData,
  RegisterFailed,
  RegisterSuccess,
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
  options?: MutationOptions<LoginSuccess, LoginFailed>
) => {
  return useMutation<LoginSuccess, AxiosError<LoginFailed>, LoginData>({
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
export const useRegister = (
  options?: MutationOptions<RegisterSuccess, RegisterFailed>
) => {
  return useMutation<RegisterSuccess, AxiosError<RegisterFailed>, RegisterData>(
    {
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
    }
  );
};
