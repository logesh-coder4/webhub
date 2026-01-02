'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '@/components/admin/data-table'
import { WebProjects } from '@/lib/generated/prisma/client'
import { webProjectColumns } from '@/components/admin/columns'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { webProjectFields } from '@/lib/inputFields'
import { getWebProject } from '@/data/project'
import { deleteProject, updateProject } from '@/dal/createProject.dal'

const AdminWebProjects = ({data}:{data:WebProjects[]}) => {
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [updateData,setUpdateData]=useState<WebProjects>()

    const handleDelete=async()=>{
        const project=await deleteProject(id!,"web")
        toast.error(project.message)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:WebProjects) => {
        const project=await updateProject(id!,"web",rawData)
        toast.success(`${project?.id} is updated`)
        setUpdateData(project!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<WebProjects> data={data} columns={webProjectColumns({setId,setOperation,setUpdateData})} filterName='name'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<WebProjects> handleClose={handleClose} handleUpdate={handleUpdate} rawData={updateData!} fields={webProjectFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminWebProjects