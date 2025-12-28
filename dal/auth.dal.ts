'use server'
import { SignUpType } from "@/dto/auth.dto"
import {db} from "@/lib/db"
import { User } from "@/lib/generated/prisma/client"
import { hashPassword } from "@/lib/passkey"
import { revalidateTag } from "next/cache"

export const createUser=async(userData:SignUpType)=>{
    try {
        const {username,email,password}=userData
        const isAlreadyUserExists=await db.user.findUnique({where:{email:email}})
        const isAlreadyUserNameExists=await db.user.findFirst({where:{username:username}})
        if (isAlreadyUserExists){
            throw new Error("User with this email already exists")
        }
        if (isAlreadyUserNameExists){
            throw new Error("Username already exists so choose different one")
        }
        const hashedPassword=await hashPassword(password)
        const user=await db.user.create({data:{
            username:username,
            email:email,
            password:hashedPassword
        }})
            return {
            username:user.username,
            email:user.email,
            isSuperUser:user.isSuperUser,
            isAdmin:user.isAdmin,
            }

    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const deleteUser=async (id:number) => {
    const user=await db.user.findUnique({where:{id}})
    if (!user) {
        return {message:"User doesn't exist"}
    }
    await db.user.delete({where:{id}})
    revalidateTag('users',"max")
    return {message:"User deleted successfully"}
}
export const updateUser=async (id:number,data:User) => {
    console.log(id,data);
    
    const user=await db.user.findUnique({where:{id}})
    if (!user) {
        return user
    }
    const updatedUser=await db.user.update({
        where:{id},
        data
    })
    revalidateTag('users',"max")
    return updatedUser
}