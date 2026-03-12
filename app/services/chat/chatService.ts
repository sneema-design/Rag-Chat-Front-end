import api from "@/app/api/axiosInstance";
import type { chatResponse, chatValues } from "@/app/types/chatType";
import axios from "axios";

export const askQuestion = async (chatData: chatValues): Promise<chatResponse> => {
  try {
    const res = await api.post("/ask", chatData);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to response");
    }
    throw new Error("Failed to response");
  }
};
