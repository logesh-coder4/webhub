'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '../data-table'
import { Notification } from '@/lib/generated/prisma/client'
import { notificationsColumns } from '../columns'
import { getAllNotifications, getNotification } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { notificationInputFields } from '@/lib/inputFields'
import { deleteNotification, updateNotification } from '@/dal/admin.dal'

const AdminNotifications = () => {
    const [data,setData]=useState<Notification[]>([])
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [notification,setNotification]=useState<Notification>()
    useEffect(()=>{
        const fetchData=async()=>{
            const notifications=await getAllNotifications()
            setData(notifications)
        }
        fetchData()
    },[id,operation])

    useEffect(()=>{
        const fetchData=async () => {
            const notification=await getNotification(id!)
            setNotification(notification!)
        }
        if (id)fetchData() 
    },[id,operation])

    const handleDelete=async()=>{
        const notification=await deleteNotification(id!)
        toast.success(notification.title)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:Notification) => {
        const notification=await updateNotification(id!,rawData)
        setNotification(notification!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<Notification> data={data} columns={notificationsColumns({setId,setOperation})} filterName='id'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<Notification> handleClose={handleClose} handleUpdate={handleUpdate} rawData={notification!} fields={notificationInputFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminNotifications