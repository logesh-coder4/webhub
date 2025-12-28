"use client"
import { projectIsverified } from '@/actions/projectActions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2 } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProjectArea = () => {
    const searchParams=useSearchParams()
    const type=searchParams.get('type')
    const {key}=useParams()
    const [isVerified,setIsVerified]=useState(false)
    useEffect(()=>{
        const func=async () => {
            const result=await projectIsverified(key as string,type as "web"|"others")
            setIsVerified(result!)
        }
        func()
    },[type,key])
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Card className='w-full max-w-2xs border-2 shadow-lg border-stone-300 dark:border-neutral-700'>
                <CardHeader>
                    <CardTitle className='text-center'>{isVerified?"Verified":"Wait for approval"}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    {isVerified?<CheckCircle2 className='text-emerald-500'/>:<Spinner className='size-8 text-blue-600'/>}
                </CardContent>
            </Card>
        </div>
    )
}

export default ProjectArea