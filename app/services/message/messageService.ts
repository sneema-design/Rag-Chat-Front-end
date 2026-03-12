import api from "@/app/api/axiosInstance";
import type { message, messageValues } from "@/app/validation/message.schema";
import axios from "axios";

export const createMessage = async (
  messageData: messageValues,
): Promise<message> => {
  try {
    const res = await api.post("/message", messageData);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //   console.error(error?.response?.data);
      throw new Error(error.response?.data?.message || "Failed to SignUp");
    }
    throw new Error("Failed to SignUp");
  }
};
