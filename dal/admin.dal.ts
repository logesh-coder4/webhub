'use server'
import {db} from "@/lib/db"
import { Blog, Message, Notification, Testimonials } from "@/lib/generated/prisma/client"
import { revalidatePath } from "next/cache"


export const deleteBlog=async(id:number)=>{
    const blog=await db.blog.delete({where:{id}})
    revalidatePath('/admin/blogs')
    return blog
} 

export const updateBlog=async(id:number,data:Blog)=>{
    const blog=await db.blog.update({where:{id},data})
    revalidatePath('/admin/blogs')
    return blog
} 

export const deleteNotification=async(id:number)=>{
    const blog=await db.notification.delete({where:{id}})
    revalidatePath('/admin/notificatios')
    return blog
} 

export const updateNotification=async(id:number,data:Notification)=>{
    const blog=await db.notification.update({where:{id},data})
    revalidatePath('/admin/notificatios')
    return blog
} 

export const deleteMessage=async(id:number)=>{
    const blog=await db.message.delete({where:{id}})
    revalidatePath('/admin/projects/messages')
    return blog
} 

export const updateMessage=async(id:number,data:Message)=>{
    const blog=await db.message.update({where:{id},data})
    revalidatePath('/admin/projects/messages')
    return blog
} 

export const deleteTestimonial=async(id:number)=>{
    const blog=await db.testimonials.delete({where:{id}})
    revalidatePath('/admin/testimonials')
    return blog
} 
export const updateTestimonial=async(id:number,data:Testimonials)=>{
    const blog=await db.testimonials.update({where:{id},data})
    revalidatePath('/admin/testimonials')
    return blog
} 