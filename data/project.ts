'use server'
import {db} from "@/lib/db"

export const getProjects=async () => {
    try {
        const webProjects=await db.webProjects.findMany({take:2})
        const otherProjects=await db.otherProjects.findMany({take:2})
        const projects=[...webProjects,...otherProjects]   
        return {
            isSuccess:true,
            projects
        }
    } catch (error) {        
        return {
            isSuccess:false,
            error:error
        }
    }
}


export const getUserProjects=async (userId:string) => {    
    try {
        const webProjects=await db.webProjects.findMany({where:{
            userId:parseInt(userId)
        }})
        const otherProjects=await db.otherProjects.findMany({
            where:{
                userId:parseInt(userId)
            }
        })
        const webProjectsCount=webProjects.length
        const otherProjectsCount=otherProjects.length
        const totalProjectsCount=webProjectsCount+otherProjectsCount
        const ongoing=webProjects.filter(proj=>proj.status==="ongoing").length
        const completed=webProjects.filter(proj=>proj.status==="completed").length
        return {
            isSuccess:true,
            webProjects,
            otherProjects,
            webProjectsCount,
            otherProjectsCount,
            ongoing,
            completed,
            totalProjectsCount
        }
    } catch (error:Error|any) {
        return {
            isSuccess:false,
            error:error.message
        }
    }
}

export const getWebProject=async (id:number) => {
    const project=await db.webProjects.findUnique({where:{id}})
    if (!project) {
        // return  {message:"Error"}
        return
    }
    return project
}
export const getOtherProject=async (id:number) => {
    const project=await db.otherProjects.findUnique({where:{id}})
    if (!project) {
        // return  {message:"Error"}
        return
    }
    return project
}