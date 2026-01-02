'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '@/components/admin/data-table'
import { User } from '@/lib/generated/prisma/client'
import { userColumns } from '@/components/admin/columns'
import { getAllUsers, getUser } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { deleteUserAction } from '@/actions/authUser'
import { toast } from 'sonner'
import { updateUser } from '@/dal/auth.dal'
import { UserInputFields } from '@/lib/inputFields'

const AdminUsers = ({data}:{data:User[]}) => {
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [updateData,setUpdateData]=useState<User>()

    const handleDelete=async()=>{
        const user=await deleteUserAction(id!)
        toast.error(`user is deleted successfully`)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:User) => {
        const user=await updateUser(id!,rawData)
        toast.success(`${user?.id} is updated`)
        setUpdateData(user!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<User> data={data} columns={userColumns({setId,setOperation,setUpdateData})} filterName='email'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<User> handleClose={handleClose} handleUpdate={handleUpdate} rawData={updateData!} fields={UserInputFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminUsers