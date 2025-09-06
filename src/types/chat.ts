export interface Chat {
  message: string;
  conversationId: string;
}

export interface ChatSuccessResponse<T> {
  isSuccess: true;
  data: T;
}

export interface ChatErrorResponse {
  isSuccess: false;
  error: string;
}

export type ChatResponse<T> = ChatSuccessResponse<T> | ChatErrorResponse;

export interface ChatData {
  prompt: string;
  conversationId?: string;
}
