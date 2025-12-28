import AdminMessages from '@/components/admin/AdminMessages'
import { getAllMessages } from '@/data/admin'
import { connection } from 'next/server'
import React from 'react'

const AdminMessagesPage = async() => {
    await connection()
    const data=await getAllMessages()
    return (
        <div className="">
            <AdminMessages data={data}/>
        </div>
    )
}

export default AdminMessagesPage