'use server'
import { signIn, signOut } from "@/auth"
import { createUser, deleteUser, updateUser } from "@/dal/auth.dal";
import { SignUpType} from "@/dto/auth.dto";
import { User } from "@/lib/generated/prisma/client";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export const userLogin=async(data:FormData)=>{    
    const email=data.get('email')
    const password=data.get('password')
    try {
        await signIn('credentials',{
            redirect:false,
            email,
            password,
        })
    } catch (error) {
        const someError = error as CredentialsSignin;
        return someError.cause?.err;
    }
    redirect('/')
}

export const registerUser=async(data:SignUpType)=>{
    try {
        const user=await createUser(data)
    } catch (error:any) {
       return {error:error}
    }
    redirect('/login')
}


export const logOut=async () => {
        await signOut()
    }

export const deleteUserAction=async (id:number) => {
    const response=await deleteUser(id)
    return response
}

export const updateUserAction=async (id:number,data:User) => {
    const updatedUser=await updateUser(id,data)
    return updatedUser
}