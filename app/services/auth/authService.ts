import api from "@/app/api/axiosInstance";
import axios from "axios";
import type { signUpResponse, signUpValues } from "@/app/types/signUpType";


export const signUp=async(signUpData:signUpValues):Promise<signUpResponse>=>{
 try {
    const res = await api.post("/user",signUpData);
    return res.data;
 } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      throw new Error(error.response?.data?.message || "Failed to Login");
    }
    throw new Error("Failed to Login");
 }
}