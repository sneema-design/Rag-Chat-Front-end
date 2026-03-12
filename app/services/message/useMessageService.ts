import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "./messageService";
import type { messageValues ,message} from "@/app/validation/message.schema";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<message, Error, messageValues>({
    mutationFn: createMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["single-chat", data.chatId],
      });
    },
  });
};