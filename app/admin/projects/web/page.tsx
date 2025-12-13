'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '../../data-table'
import { WebProjects } from '@/lib/generated/prisma/client'
import { webProjectColumns } from '../../columns'
import { getAllWebProjects } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { webProjectFields } from '@/lib/inputFields'
import { getWebProject } from '@/data/project'
import { deleteProject, updateProject } from '@/dal/createProject.dal'

const AdminWebProjects = () => {
    const [data,setData]=useState<WebProjects[]>([])
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [project,setProject]=useState<WebProjects>()
    useEffect(()=>{
        const fetchData=async()=>{
            const projects=await getAllWebProjects()
            setData(projects)
        }
        fetchData()
    },[id,operation])

    useEffect(()=>{
        const fetchData=async () => {
            const project=await getWebProject(id!)
            setProject(project!)
        }
        if (id)fetchData() 
    },[id,operation])

    const handleDelete=async()=>{
        const project=await deleteProject(id!,"web")
        toast.success(project.message)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:WebProjects) => {
        const project=await updateProject(id!,"web",rawData)
        setProject(project!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<WebProjects> data={data} columns={webProjectColumns({setId,setOperation})} filterName='name'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<WebProjects> handleClose={handleClose} handleUpdate={handleUpdate} rawData={project!} fields={webProjectFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminWebProjects