'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Testimonials } from "@/lib/generated/prisma/client";
import { redirect } from "next/navigation";

export async function createTestimonial(data:Testimonials) {
    const user=await auth()
    const userId=Number(user?.user?.id)
    data.userId=userId
    if (!user){
        redirect('/login')
    }
    try{
        await db.testimonials.create({
            data
        })
        return {isSuccess:true}
    }catch(error){
        throw new Error(error.message)
    }
}