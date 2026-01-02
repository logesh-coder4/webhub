'use client'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useRouter } from 'next/navigation'


const ProjectTypeCard = ({pType}:
    {pType:{title:string,description:string,icon:React.ReactNode,path:string}}) => {
        const router=useRouter()
    return (
        <Card className='dark:bg-zinc-900/50 bg-zinc-300/50 hover:scale-105 max-w-md w-full' onClick={()=>router.push(`/select-service?type=${pType.path}`)}>
            <CardHeader className=''>
                <CardTitle className='flex gap-2'>{pType.icon}{pType.title}</CardTitle>
                <CardDescription className='text-foreground'>{pType.description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

export default ProjectTypeCard