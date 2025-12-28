'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '@/components/admin/data-table'
import { OtherProjects } from '@/lib/generated/prisma/client'
import { otherProjectColumns } from '@/components/admin/columns'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { otherProjectFields } from '@/lib/inputFields'
import { getOtherProject } from '@/data/project'
import { deleteProject, updateProject } from '@/dal/createProject.dal'

const AdminOtherProject = ({data}:{data:OtherProjects[]}) => {
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [updateData,setUpdateData]=useState<OtherProjects>()

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
        setUpdateData(project!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<OtherProjects> data={data} columns={otherProjectColumns({setId,setOperation,setUpdateData})} filterName='projectName'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<OtherProjects> handleClose={handleClose} handleUpdate={handleUpdate} rawData={updateData!} fields={otherProjectFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminOtherProject