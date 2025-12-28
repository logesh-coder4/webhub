'use server'
import {db} from "@/lib/db"
import { getSession } from "@/lib/getSession";

export const getTestimonials=async () => {
    try {
        const testimonials=await db.testimonials.findMany({
            where:{isApproved:true},
            include:
            {user:{
                select:{
                    username:true,
                    profession:true
                }}
            }
        })
        return {
            data:testimonials,
            error:""
        }
    } catch (error) {
        return {
            error:error,
            data:[]
        }
    }
}

export const getUserNotificaions=async()=>{
    const session=await getSession()
    const userId=Number(session?.user.id)
    const notifications=await db.notification.findMany({where:{userId}})
    return notifications
}

export const getPublishedBlogs=async()=>{
    const blogs=await db.blog.findMany({where:{isPublished:true},include:{user:{select:{username:true}}}})
    return blogs
}