import db from "@/lib/db";
import { Message } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher=new Pusher({
    appId:process.env.PUSHER_APPID!,
    key:process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret:process.env.PUSHER_SECREAT!,
    cluster:"ap2",
    useTLS:true
})

export async function GET(request:NextRequest) {
    let messages:Message[]=[]
    let projectName;
    const searchParams=request.nextUrl.searchParams
    const key=searchParams.get("key") as string
    const projectType=searchParams.get("type")    
    if (projectType==='web') {
        projectName=await db.webProjects.findFirst({
            where:{
                secreatKey:key
            },select:{
                name:true
            }
        })
        messages=await db.message.findMany({
        where:{webProjectKey:key},
        include:{sender:{
            select:{
                id:true,
                username:true,
            }
        }},
        omit:{
            otherProjectKey:true
        },
        orderBy:{createdAt:"asc"}
        })   
    }else if(projectType==='others'){
        projectName=await db.otherProjects.findFirst({
            where:{
                secreatKey:key
            },select:{
                projectName:true
            }
        })
        messages=await db.message.findMany({
        where:{otherProjectKey:key},
        include:{sender:{
            select:{
                id:true,
                username:true,
            }
        }},
        omit:{
            webProjectKey:true
        },
        orderBy:{createdAt:"asc"}
        })
    }
    return NextResponse.json({
        projectName,
        messages
    })
}

export async function POST(req:NextRequest) {
    let message;
    const body=await req.json() as {
        text:string,
        senderId:number,
        key:string
    }
    const searchParams=req.nextUrl.searchParams
    const projectType=searchParams.get("type")
    if (projectType==='web') {
        message=await db.message.create({
            data:{
                text:body.text,
                webProjectKey:body.key,
                senderId:body.senderId,
            },
            include:{sender:{
            select:{
                id:true,
                username:true,
            }
        }},
        omit:{
            otherProjectKey:true
        },
        })
    }else if(projectType==='others'){
        message=await db.message.create({
            data:{
                text:body.text,
                otherProjectKey:body.key,
                senderId:body.senderId,
            },
        include:{sender:{
            select:{
                id:true,
                username:true,
            }
        }},
        omit:{
            webProjectKey:true
        },
        })
    }
    await pusher.trigger(
        `chat-${body.key}`,"new-message",message
    )
    return NextResponse.json(message)
}