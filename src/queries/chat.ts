import { useMutation } from "@tanstack/react-query";
import {
  Chat,
  ChatSuccessResponse,
  ChatErrorResponse,
  ChatData,
} from "@/types/chat";
import { AxiosError } from "axios";
import { instance } from "@/lib/axios";
import { MutationOptions } from "@/types/queries";

export const chatKeys = {
  chat: ["all"],
};

export const useChat = (
  options?: MutationOptions<ChatSuccessResponse<Chat>, ChatErrorResponse>
) => {
  return useMutation<
    ChatSuccessResponse<Chat>,
    AxiosError<ChatErrorResponse>,
    ChatData
  >({
    mutationFn: (args) =>
      instance.post("/api/chat", args).then((res) => res.data),
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
