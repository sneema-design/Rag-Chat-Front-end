"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ProtectLayout({children}:any) {
    const router= useRouter();
    useEffect(()=>{
            const user= localStorage.getItem("userId");
            if(!user){
                router.push("/login");
            }
    },[])
    return <>{children}</>
};
