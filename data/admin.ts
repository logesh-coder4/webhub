'use server'

import {db} from "@/lib/db"
// import { cacheLife, cacheTag } from "next/cache"

export const getAllUsers=async ()=>{
    // 'use cache'
    // cacheTag("users")
    // cacheLife("hours")
    const users=await db.user.findMany()
    return users
}

export const getAllWebProjects=async () => {
    const projects=await db.webProjects.findMany()
    return projects
}

export const getAllOtherProjects=async () => {
    const projects=await db.otherProjects.findMany()
    return projects
}

export const getAllBlogs=async () => {
    const blogs=await db.blog.findMany()
    return blogs
}

export const getAllTestimonials=async () => {
    const testimonials=await db.testimonials.findMany()
    return testimonials
}
export const getAllMessages=async () => {
    const messages=await db.message.findMany()
    return messages
}
export const getAllNotifications=async () => {
    const messages=await db.notification.findMany()
    return messages
}

export const getUser=async (id:number) => {
    const user=await db.user.findUnique({where:{id}})
    return user
}
export const getBlog=async (id:number) => {
    const user=await db.blog.findUnique({where:{id}})
    return user
}
export const getMessage=async (id:number) => {
    const user=await db.message.findUnique({where:{id}})
    return user
}
export const getNotification=async (id:number) => {
    const user=await db.notification.findUnique({where:{id}})
    return user
}
export const getTestimonial=async (id:number) => {
    const user=await db.testimonials.findUnique({where:{id}})
    return user
}