import api from "@/app/api/axiosInstance";
import type { AllChatResponse } from "@/app/types/allChatType";
import axios from "axios";



export const getAllChat=async():Promise<AllChatResponse>=>{
    try {
        const id=localStorage.getItem("userId")
        const res = await api.get(`/chat/user/${id}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to SignUp");
    }
    throw new Error("Failed to SignUp");
    }
}