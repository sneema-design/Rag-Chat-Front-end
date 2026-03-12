import api from "@/app/api/axiosInstance";
import type { AllChatResponse, newChatValue, SingleChatResponse } from "@/app/types/allChatType";
import axios from "axios";



export const getAllChat=async():Promise<AllChatResponse>=>{
    try {
        const id=localStorage.getItem("userId")
        const res = await api.get(`/chat/user/${id}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to get chats");
    }
    throw new Error("Failed to SignUp");
    }
}


export const getChatById=async(id:number):Promise<SingleChatResponse>=>{
  try {
    const res= await api.get(`/chat/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to get chat data");
    }
    throw new Error("Failed to get chat data");
  }
}

export const createChat=async(newchatData:newChatValue):Promise<SingleChatResponse>=>{
    try{
         const res = await api.post("/chat",newchatData);
         return res.data;
    }catch(error){
         if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to get chat data");
    }
    throw new Error("Failed to get chat data");
  }
}