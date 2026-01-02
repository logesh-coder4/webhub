'use client'
import { Activity, useEffect, useState } from 'react'
import { Notification } from '@/lib/generated/prisma/client'
import { getAllNotifications, getNotification } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { notificationInputFields } from '@/lib/inputFields'
import { deleteNotification, updateNotification } from '@/dal/admin.dal'
import { CustomTable } from './data-table'
import { notificationsColumns } from './columns'

const AdminNotifications = ({data}:{data:Notification[]}) => {
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [updateData,setUpdateData]=useState<Notification>()

    const handleDelete=async()=>{
        const notification=await deleteNotification(id!)
        toast.error(`${notification.title} is deleted successfully`)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:Notification) => {
        const notification=await updateNotification(id!,rawData)
        toast.success(`${notification?.id} is updated`)
        setUpdateData(notification!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<Notification> data={data} columns={notificationsColumns({setId,setOperation,setUpdateData})} filterName='id'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<Notification> handleClose={handleClose} handleUpdate={handleUpdate} rawData={updateData!} fields={notificationInputFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminNotifications