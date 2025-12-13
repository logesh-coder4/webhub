'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '../data-table'
import { User } from '@/lib/generated/prisma/client'
import { userColumns } from '../columns'
import { getAllUsers, getUser } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { deleteUserAction } from '@/actions/authUser'
import { toast } from 'sonner'
import { updateUser } from '@/dal/auth.dal'
import { UserInputFields } from '@/lib/inputFields'

const AdminUsers = () => {
    const [data,setData]=useState<User[]>([])
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [user,setUser]=useState<User>()
    useEffect(()=>{
        const fetchData=async()=>{
            const users=await getAllUsers()
            console.log(users);
            
            setData(users)
        }
        fetchData()
    },[id,operation])

    useEffect(()=>{
        const fetchData=async () => {
            const user=await getUser(id!)
            setUser(user!)
        }
        if (id)fetchData() 
    },[id,operation])

    const handleDelete=async()=>{
        const user=await deleteUserAction(id!)
        toast.success(user.message)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:User) => {
        const user=await updateUser(id!,rawData)
        setUser(user!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<User> data={data} columns={userColumns({setId,setOperation})} filterName='email'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<User> handleClose={handleClose} handleUpdate={handleUpdate} rawData={user!} fields={UserInputFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminUsers