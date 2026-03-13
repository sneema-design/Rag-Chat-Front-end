import api from "@/app/api/axiosInstance";
import { handleAxiosError } from "@/app/utils/errorUtils";
import type { message, messageValues } from "@/app/validation/message.schema";

export const createMessage = async (
  messageData: messageValues,
): Promise<message> => {
  try {
    const res = await api.post("/message", messageData);
    return res.data;
  } catch (error) {
       throw new Error(handleAxiosError(error, "Failed to create message"));
    
  }
};
