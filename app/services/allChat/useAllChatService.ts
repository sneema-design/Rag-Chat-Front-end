import { useQuery } from "@tanstack/react-query";

import { getAllChat } from "./allChatService";
import type { AllChatResponse } from "@/app/types/allChatType";


export const useGetAllChat=()=>{
    return useQuery<AllChatResponse,Error>({
        queryKey: ["chats"],
        queryFn:getAllChat
    })
}