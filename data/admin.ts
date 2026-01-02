'use server'

import {db} from "@/lib/db"
import { cacheLife, cacheTag } from "next/cache"

export const getAllUsers=async ()=>{
    'use cache'
    cacheTag("users")
    cacheLife("hours")
    const users=await db.user.findMany()
    return users
}

export const getAllWebProjects=async () => {
    'use cache'
    cacheTag("webprojects")
    cacheLife("hours")
    const projects=await db.webProjects.findMany()
    return projects
}

export const getAllOtherProjects=async () => {
    'use cache'
    cacheTag("otherprojects")
    cacheLife("hours")
    const projects=await db.otherProjects.findMany()
    return projects
}

export const getAllBlogs=async () => {
    'use cache'
    cacheTag("blogs")
    cacheLife("hours")
    const blogs=await db.blog.findMany()
    return blogs
}

export const getAllTestimonials=async () => {
    'use cache'
    cacheTag("testimonials")
    cacheLife("hours")
    const testimonials=await db.testimonials.findMany()
    return testimonials
}
export const getAllMessages=async () => {
    'use cache'
    cacheTag("messages")
    cacheLife("hours")
    const messages=await db.message.findMany()
    return messages
}
export const getAllNotifications=async () => {
    'use cache'
    cacheTag("notifications")
    cacheLife("hours")
    const messages=await db.notification.findMany()
    return messages
}