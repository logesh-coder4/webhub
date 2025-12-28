import { ScrollArea } from '@/components/ui/scroll-area'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BlogLayout = async({children,params}:{children:React.ReactNode,params:any}) => {
    const {path}=await params
    const links = {
    Blogs:[
        {
        title:"Articles",
        url:"/bolgs/articles",
        icon:Home
        },
    ],
}
    return (
        <div className="grid grid-rows-[64px_1fr] h-screen">
            <div className=""></div>
            <div className="flex h-full">
                <aside className="w-1/4 fixed left-0 h-94 z-50">
                    <ScrollArea>
                        {Object.entries(links).map(([key,values],idx)=>(
                            <div className="px-1" key={idx}>
                                <h2 className='font-semibold text-[13px] dark:text-stone-200 text-stone-800 px-2'>{key}</h2>
                                <div className="py-2 flex flex-col text-sm">
                                    {values.map((value,idx)=><Link href={value.url} key={idx} className={`font-semibold w-fit rounded p-2 hover:bg-stone-200 dark:hover:bg-[#262626] ${path===value.title.toLowerCase()&&"dark:bg-[#262626] bg-stone-200"}`}>{value.title}</Link>)}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </aside>
                <div className="flex-1 ml-80">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BlogLayout