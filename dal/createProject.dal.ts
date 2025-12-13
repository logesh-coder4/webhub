'use server'
import { OtherProjectType } from "@/dto/project.dto";
import { CreateWebProjectType } from "@/dto/project.dto";
import {db} from "@/lib/db";
import { OtherProjects, WebProjects } from "@/lib/generated/prisma/client";
import {getSession} from "@/lib/getSession";
import { createSecreatKey } from "@/lib/passkey";

export async function createWebProject(rawData:CreateWebProjectType) {
    const session=await getSession()
    if (!session?.user) {
        throw new Error('Not Authenticated')
    }
    try{
        const {name,description,projectType,frontendTech,backendTech,database,language,service}=rawData
        const projectData={
            name,
            description,
            projectType,
            backendTech,
            frontendTech,
            database,
            language,
            service,
            userId:parseInt(session?.user.id!)
        }
        const project=await db.webProjects.create(
        {data:projectData})
        const secreatKey=createSecreatKey(project.id)
        const updatedProject=await db.webProjects.update({
            where:{
                id:project.id
            },
            data:{
                secreatKey:secreatKey
            },include:{user:{
                select:{username:true}
            }}
        })
        return updatedProject
    }catch(error){
        throw new Error(error)
    }
}

export const createOtherProject=async (data:OtherProjectType) => {
    const session=await getSession()
    if (!session?.user) {
        throw new Error('Not Authenticated')
    }
    try {
            data.userId=parseInt(session.user.id!)
        const project=await db.otherProjects.create({data:data})
        const secreatKey=createSecreatKey(project.id)
        const updatedProject=await db.otherProjects.update({
            where:{
                id:project.id
            },
            data:{
                secreatKey:secreatKey
            },include:{user:{
                select:{username:true}
            }}
        })
        return updatedProject
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteProject=async (id:number,model:'web'|"others") => {
    if (model==='web') {
        await db.webProjects.delete({where:{id}})
    }else if(model==='others'){
        await db.otherProjects.delete({where:{id}})
    }
    return {message:"Project Deleted"}
}

export const updateProject=async (id:number,model:'web'|"others",data:WebProjects|OtherProjects) => {
    let project;
    if (model==='web') {
        project=await db.webProjects.update({where:{id},data})
    }else if(model==='others'){
        project=await db.otherProjects.update({where:{id},data})
    }
    return project
}