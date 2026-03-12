import { useMutation} from "@tanstack/react-query";
import { askQuestion } from "./chatService";
import type { chatResponse,chatValues } from "@/app/types/chatType";

export const useAskQuestion=()=>{
     return useMutation<chatResponse, Error, chatValues>({
    mutationFn: (chatData: chatValues) => askQuestion(chatData),
   
  });
}