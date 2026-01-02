import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ProjectTypeLoading = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center gap-4">
            {Array.from({length:2}).map((_,idx)=>(
                <Skeleton className='w-md h-32 p-2 flex flex-col gap-y-2' key={idx}>
                    <Skeleton className='w-36 h-4 bg-slate-400 mb-2'/>
                    <Skeleton className='w-full h-4 bg-slate-400'/>
                    <Skeleton className='w-full h-4 bg-slate-400'/>
                    <Skeleton className='w-1/2 mt-1 h-4 bg-slate-400'/>
                </Skeleton>
            ))}
        </div>
    )
}

export default ProjectTypeLoading