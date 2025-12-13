import { db } from "./db"
import { genSalt,hash,compare } from "bcrypt-ts";
import crypto from "crypto";

export const checkIsUser=async (userEmail:string) => {
    const user=await db.user.findUnique({where:{email:userEmail}})
    return user
}

export const hashPassword=async (password:any) => {
    const saltrounds=await genSalt(10)
    const hashedPassword=await hash(password,saltrounds)
    return hashedPassword
}

export const verifyPassword=async (password:any,hashedPassword:any) => {
    const isMatch=await compare(password,hashedPassword)
    return isMatch
}

export const createSecreatKey=(id:number)=>{
    const secreatKey=process.env.SECREAT_KEY as string
    const key=crypto.createHmac("sha1",secreatKey).update(id.toString()).digest('hex')
    return key.slice(0,30)
}