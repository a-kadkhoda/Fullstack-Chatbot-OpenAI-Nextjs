import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  all: ["chat"],
  messages: (conversationId: string) => [...chatKeys.all, conversationId],
  conversation: ["conversation"],
};

export const useGetMessages = (conversationId: string) => {
  return useQuery({
    queryKey: chatKeys.messages(conversationId),
    queryFn: () =>
      instance
        .get(`/api/message?conv=${conversationId}`)
        .then((res) => res.data),
    enabled: !!conversationId,
  });
};
export const useGetConversation = () => {
  return useQuery({
    queryKey: chatKeys.conversation,
    queryFn: () => instance.get("/api/conversation").then((res) => res.data),
  });
};

export const useChat = (
  options?: MutationOptions<ChatSuccessResponse<Chat>, ChatErrorResponse>
) => {
  const queryClient = useQueryClient();
  return useMutation<
    ChatSuccessResponse<Chat>,
    AxiosError<ChatErrorResponse>,
    ChatData
  >({
    mutationFn: (args) =>
      instance.post("/api/chat", args).then((res) => res.data),
    onSuccess: (data, variables) => {
      options?.onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: chatKeys.conversation });

      if (variables.conversationId) {
        queryClient.invalidateQueries({
          queryKey: chatKeys.messages(variables.conversationId),
        });
      }
    },
    onError: (error) => {
      options?.onError?.(error.response?.data);
    },
    onSettled(data, error) {
      options?.onSettled?.(data, error?.response?.data);
    },
  });
};
