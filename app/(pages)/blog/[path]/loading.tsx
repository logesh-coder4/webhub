import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const BlogLoading = () => {
    return (
        <div className='space-y-3'>
        {Array.from({length:2}).map((_,idx)=>(
            <article key={idx} className="bg-white dark:bg-[#0b0b0d] border border-transparent hover:border-gray-200 dark:hover:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between">
                <header className="mb-4">
                {/* Category badge */}
                <Skeleton className='h-8 w-36'/>

                <Skeleton className='h-4 w-60 bg-gray-300 mt-4'/>
                <Skeleton className='h-4 w-1/2 bg-gray-300 mt-3'/>
                </header>

                <footer className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    {/* Avatar or initials */}
                    <Skeleton className='h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800'/>

                    <div className='space-y-2'>
                    <Skeleton className='h-4 w-38 bg-gray-300'/>
                    <Skeleton className='h-4 w-24 bg-gray-300'/>
                    </div>
                </div>
                </footer>
            </article>
        ))}
        </div>
    )
}

export default BlogLoading