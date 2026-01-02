'use client'
import { Activity, useEffect, useState } from 'react'
import { Message } from '@/lib/generated/prisma/client'
import { getMessage } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { messageInputFields } from '@/lib/inputFields'
import { deleteMessage, updateMessage } from '@/dal/admin.dal'
import { messagesColumns } from './columns'
import { CustomTable } from './data-table'

const AdminMessages = ({data}:{data:Message[]}) => {
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [updateData,setUpdateData]=useState<Message>()

    const handleDelete=async()=>{
        const message=await deleteMessage(id!)
        toast.error(`${message.id} is deleted successfully`)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:Message) => {
        const message=await updateMessage(id!,rawData)
        toast.success(`${message?.id} is updated`)
        setUpdateData(message!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<Message> data={data} columns={messagesColumns({setId,setOperation,setUpdateData})} filterName='id'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<Message> handleClose={handleClose} handleUpdate={handleUpdate} rawData={updateData!} fields={messageInputFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminMessages