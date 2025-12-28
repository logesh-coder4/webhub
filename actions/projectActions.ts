'use server'
import { createWebProject,createOtherProject, deleteProject, updateProject } from "@/dal/createProject.dal";
import { OtherProjectType } from "@/dto/project.dto";
import { CreateWebProjectType } from "@/dto/project.dto";
import { OtherProjects, WebProjects } from "@/lib/generated/prisma/client";
import {getSession} from "@/lib/getSession";
import { sendNotification } from "./utils";
import { db } from "@/lib/db";

export const createWebProjectAction=async (data:CreateWebProjectType) => {
    try{
        const session=await getSession()
        if (!session?.user) {
            return
        }
        const project=await createWebProject(data)
        await sendNotification({
            title:"Project Created",
            message:`the ${project.name} web project is created successfully`,
            type:"update",
        })
        return {isSuccess:true,projectData:project}
    }catch(error){
        return {isSuccess:false,error}
    }
}

export const createOtherProjectAction=async (data:OtherProjectType) => {
    try{
        const session=await getSession()
        if (!session?.user) {
            return
        }
        const project=await createOtherProject(data)
        await sendNotification({
            title:"Project Created",
            message:`the ${project.projectName?project.projectName+"Project":project.technology + "Mentorship"} is created successfully`,
            type:"update",
        })
        return {isSuccess:true,projectData:project}
    }catch(error){
        return {isSuccess:false}
    }
}

export const deleteProjectAction=async (id:number,model:'web'|"others") => {
    const response=await deleteProject(id,model)
    return response
}
export const updateProjectAction=async (id:number,model:'web'|"others",data:WebProjects|OtherProjects) => {
    const response=await updateProject(id,model,data)
    return response
}

export const projectIsverified=async (key:string,type:"web"|"others")=>{
    if (type==="web") {
            const project=await db.webProjects.findUnique({where:{
            secreatKey:key
        }})
        return project?.isVerified
    }else if(type==="others"){
            const project=await db.otherProjects.findUnique({where:{
            secreatKey:key
        }})
        return project?.isVerified
    }else{
        return false
    }
} 