'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '../../data-table'
import { OtherProjects } from '@/lib/generated/prisma/client'
import { otherProjectColumns } from '../../columns'
import { getAllOtherProjects } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { otherProjectFields } from '@/lib/inputFields'
import { getOtherProject } from '@/data/project'
import { deleteProject, updateProject } from '@/dal/createProject.dal'

const AdminOtherProject = () => {
    const [data,setData]=useState<OtherProjects[]>([])
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [project,setProject]=useState<OtherProjects>()
    useEffect(()=>{
        const fetchData=async()=>{
            const projects=await getAllOtherProjects()
            setData(projects)
        }
        fetchData()
    },[id,operation])

    useEffect(()=>{
        const fetchData=async () => {
            const project=await getOtherProject(id!)
            setProject(project!)
        }
        if (id)fetchData() 
    },[id,operation])

    const handleDelete=async()=>{
        const project=await deleteProject(id!,"others")
        toast.success(project.message)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:OtherProjects) => {
        const project=await updateProject(id!,"others",rawData)
        setProject(project!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<OtherProjects> data={data} columns={otherProjectColumns({setId,setOperation})} filterName='projectName'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<OtherProjects> handleClose={handleClose} handleUpdate={handleUpdate} rawData={project!} fields={otherProjectFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminOtherProject