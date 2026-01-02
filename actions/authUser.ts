'use server'
import { signIn, signOut } from "@/auth"
import { createUser, deleteUser, updateUser } from "@/dal/auth.dal";
import { SignUpType} from "@/dto/auth.dto";
import { db } from "@/lib/db";
import { User } from "@/lib/generated/prisma/client";
import { hashPassword } from "@/lib/passkey";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { sendResetMail } from "./sendVerifications";

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
        await createUser(data)
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

export const resetPassword=async(token:string,password:string)=>{
    try{
        if (!password) {
            throw new Error("Password is required")
        }
        const user=await db.user.findFirst({
            where:{
                resetToken:token
            }
        })
        if (!user) {
            throw new Error("User doesn't exist")
        }
        if (user.resetTokenExpires! < new Date()) {
            throw new Error("Token Expired")
        }
        const hashedPassword=await hashPassword(password)
        await db.user.update({
            where:{id:user.id},
            data:{
                password:hashedPassword
            }
        })
    }catch(error){
        throw new Error(error.message)
    }
}

export const resetPasswordAction=async (token:string,formData:FormData) => {
    try{
        const password=formData.get("password") as string
        await resetPassword(token,password)
    }catch(error){
        return error.message
    }
}

export const forgotPasswordAction=async(formData:FormData)=>{
    try {
        const email=formData.get("email") as string
        await sendResetMail(email)
        return {
            isSuccess:true,
            message:"Password reset instructions have been sent to your email address"
        }
    } catch (error) {
        return error.message
    }
}