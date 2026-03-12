import { useMutation } from "@tanstack/react-query";
import { signUp } from "./authService";
import type { signUpResponse, signUpValues } from "@/app/types/signUpType";


export const useSignup=()=>{
    return useMutation<signUpResponse,Error,signUpValues>({
        mutationFn:(singUpData:signUpValues)=> signUp(singUpData)
    })
}