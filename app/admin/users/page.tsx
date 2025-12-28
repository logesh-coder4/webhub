import AdminUsers from '@/components/admin/AdminUsers'
import { getAllUsers } from '@/data/admin'
import React from 'react'

const AdminUsersPage = async() => {
    const data=await getAllUsers()
    return (
        <div>
            <AdminUsers data={data}/>
        </div>
    )
}

export default AdminUsersPage