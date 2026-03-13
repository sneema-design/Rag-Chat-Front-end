import api from "@/app/api/axiosInstance";
import type { chatResponse, chatValues } from "@/app/types/chatType";
import { handleAxiosError } from "@/app/utils/errorUtils";

export const askQuestion = async (chatData: chatValues): Promise<chatResponse> => {
  try {
    const res = await api.post("/ask", chatData);
    return res.data;
  } catch (error) {
   throw new Error(handleAxiosError(error, "Failed to Response"));
  }
};
