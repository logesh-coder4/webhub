'use server'
import {db} from "@/lib/db"
import { getSession } from "@/lib/getSession";

interface TestimonialReturnType{
    quote:string,
    name:string
}

export const getTestimonials=async () => {
    try {
        const testimonisals=await db.testimonials.findMany({
            where:{isApproved:true},
            include:{user:{
                select:{
                    username:true
                }}}
        })
        const data:TestimonialReturnType[]=[]
        testimonisals.forEach((testimonial)=>{
            const newTestimonial={
                quote:testimonial.message,
                name:testimonial.user.username
            }
            data.push(newTestimonial)
        })
        return data
    } catch (error) {
        return {
            type:"error",
            error:error
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