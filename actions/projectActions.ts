'use server'
import { createWebProject,createOtherProject, deleteProject, updateProject } from "@/dal/createProject.dal";
import { OtherProjectType } from "@/dto/project.dto";
import { CreateWebProjectType } from "@/dto/project.dto";
import { OtherProjects, WebProjects } from "@/lib/generated/prisma/client";
import {getSession} from "@/lib/getSession";

export const createWebProjectAction=async (data:CreateWebProjectType) => {
    try{
        const session=await getSession()
        if (!session?.user) {
            return
        }
        const project=createWebProject(data)
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
        const project=createOtherProject(data)
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