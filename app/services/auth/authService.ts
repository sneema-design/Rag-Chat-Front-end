import api from "@/app/api/axiosInstance";
import type { signUpResponse, signUpValues } from "@/app/types/signUpType";
import type { loginResponse, loginValue } from "@/app/types/loginType";

import {handleAxiosError} from "@/app/utils/errorUtils"
export const signUp=async(signUpData:signUpValues):Promise<signUpResponse>=>{
 try {
    const res = await api.post("/user",signUpData);
    return res.data;
 } catch (error) {
      throw new Error(handleAxiosError(error, "Failed to SignUp"));

 }
}
export const login=async(loginData:loginValue):Promise<loginResponse>=>{
    try {
        const res =await api.post("/user/login",loginData);
        return res.data;
    } catch (error) {
     throw new Error(handleAxiosError(error, "Failed to Login"));   
    }
}