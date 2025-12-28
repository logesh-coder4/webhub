import AdminNotifications from '@/components/admin/AdminNotification'
import { getAllNotifications } from '@/data/admin'
import { connection } from 'next/server'
import React from 'react'

const AdminNotificationPage = async() => {
    await connection()
    const data=await getAllNotifications()
    return (
        <div className="">
            <AdminNotifications data={data}/>
        </div>
    )
}

export default AdminNotificationPage