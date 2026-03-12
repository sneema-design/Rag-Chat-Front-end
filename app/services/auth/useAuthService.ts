import { useMutation } from "@tanstack/react-query";
import { login, signUp } from "./authService";
import type { signUpResponse, signUpValues } from "@/app/types/signUpType";
import { loginResponse, loginValue } from "@/app/types/loginType";


export const useSignup=()=>{
    return useMutation<signUpResponse,Error,signUpValues>({
        mutationFn:(singUpData:signUpValues)=> signUp(singUpData)
    })
}

export const useLogin=()=>{
    return useMutation<loginResponse,Error,loginValue>({
        mutationFn:(loginData:loginValue)=>login(loginData)
    })
}