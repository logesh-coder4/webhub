import AdminWebProjects from '@/components/admin/AdminWebProjects'
import { getAllWebProjects } from '@/data/admin'
import { connection } from 'next/server'
import React from 'react'

const AdminWebProjectPage = async() => {
    await connection()
    const data=await getAllWebProjects()
    return (
        <div className="">
            <AdminWebProjects data={data}/>
        </div>
    )
}

export default AdminWebProjectPage