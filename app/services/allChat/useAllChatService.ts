import { useMutation, useQuery } from "@tanstack/react-query";

import { createChat, getAllChat, getChatById } from "./allChatService";
import {
  newChatValue,
  SingleChatResponse,
  type AllChatResponse,
} from "@/app/types/allChatType";
import { useQueryClient } from "@tanstack/react-query";

export const useGetAllChat = () => {
  return useQuery<AllChatResponse, Error>({
    queryKey: ["chats"],
    queryFn: getAllChat,
  });
};

export const useGetChatById = (id: number) => {
  return useQuery<SingleChatResponse, Error>({
    queryKey: ["single-chat", id],
    queryFn: () => getChatById(id),
    enabled: !!id,
  });
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleChatResponse, Error, newChatValue>({
    mutationFn: (newchatData: newChatValue) => createChat(newchatData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
};
