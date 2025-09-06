export interface MutationOptions<T, E> {
  onSuccess?: (data: T) => void;
  onError?: (error: E | undefined) => void;
  onSettled?: (data: T | undefined, error: E | undefined) => void;
}
