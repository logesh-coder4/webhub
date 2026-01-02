'use server'
import { db } from "@/lib/db";
import { Notification } from "@/lib/generated/prisma/client";
import { getSession } from "@/lib/getSession";

export async function checkProjectUser(key:string,projectType:"web"|"others") {
    const session=await getSession()
    if (projectType==="web") {
        const project=await db.webProjects.findFirst({
            where:{
                secreatKey:key
            }
        })
        if ((Number(session?.user?.id)!==project?.userId)&&(!session?.user.isSuperUser)) {
            return false
        }
    } 
    if (projectType==="others") {
        const project=await db.otherProjects.findFirst({
            where:{
                secreatKey:key
            }
        })
        if ((Number(session?.user?.id)!==project?.userId)||(!session?.user.isSuperUser)) {
            return false
        }
    } 
    return true
}

export const sendNotification=async({message="",title,type}:Partial<Notification>)=>{
    const session=await getSession()
    const userId=Number(session?.user?.id)
    await db.notification.create({
        data:{
            userId,
            message,
            title,
            type
        }
    })
}