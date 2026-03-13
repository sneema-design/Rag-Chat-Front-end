import api from "@/app/api/axiosInstance";
import type {
  AllChatResponse,
  newChatValue,
  SingleChatResponse,
} from "@/app/types/allChatType";
import { handleAxiosError } from "@/app/utils/errorUtils";

export const getAllChat = async (): Promise<AllChatResponse> => {
  try {
    const id = localStorage.getItem("userId");
    const res = await api.get(`/chat/user/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to get Data"));
  }
};

export const getChatById = async (id: number): Promise<SingleChatResponse> => {
  try {
    const res = await api.get(`/chat/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to get Data"));
  }
};

export const createChat = async (
  newchatData: newChatValue,
): Promise<SingleChatResponse> => {
  try {
    const res = await api.post("/chat", newchatData);
    return res.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to get Data"));
  }
};
