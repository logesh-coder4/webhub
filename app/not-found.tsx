'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const NotFoundPage = () => {
    const router=useRouter()
    return (
        <div className="flex items-center justify-center h-screen w-full flex-col">
            <span className="text-[10rem] font-semibold tracking-wider text-slate-900 dark:text-slate-200">404</span>
            <h2 className="text-gray-500 font-semibold">Not Found</h2>
            <div className="flex gap-x-4 mt-5">
                <Button size={"lg"} className="cursor-pointer" onClick={()=>router.push('/')}>Home</Button>
            </div>
        </div>
    )
}

export default NotFoundPage