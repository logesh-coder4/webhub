"use client"
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import WhatWeOffer from "./WhatWeOffer";

const ServiceClient = () => {
    const works=["Review Your Plan","NDA & Confidentiality","Project Analysis",'Development Phase',"Testing & Scaling","HandOver & Support"]
    const router=useRouter()
    return (
        <motion.div className="bg-gray-50 dark:bg-[#0d0d0f]">
            <div className="max-w-6xl mx-auto px-6 h-screen flex items-center justify-center flex-col">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Services That Turn Idea Into <span className="text-indigo-600">Real Product</span>
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        from websites and mobile apps to full stack systems and mentorship -we support you at every step 
                    </p>
                </div>
                <div className="flex items-center justify-center gap-5 flex-col md:flex-row lg:flex-row">
                    <Button size="lg" onClick={()=>router.push('/select-service?type=web')}>Create Project</Button>
                    <Button size="lg" variant="outline" onClick={()=>router.push('/select-service?type=others')}>Book Mentorship</Button>
                </div>
            </div>
            <div className="text-center mb-14 mt-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    What We <span className="text-pink-600">Offer</span>
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    From development to mentorship — all services in one place.
                </p>
                <div className="max-w-4xl mx-auto my-20">
                    <WhatWeOffer/>
                </div>
            </div>
            <div className="text-center my-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    How <span className="text-blue-600">We Works</span>
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    A transparent workflow designed for collaboration and success.
                </p>
                <div className="py-10">
                    {works.map((work,idx)=>(
                        <motion.div className="flex items-center justify-center flex-col" 
                            key={idx} 
                            initial={{opacity:0,y:-10,backdropFilter:"blur(10px)"}}
                            animate={{opacity:1,y:0,backdropFilter:"blur(0)"}}
                            transition={{delay:idx*0.30,duration:0.20}}
                            >
                            <Card className="w-full max-w-md h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-900"><CardTitle>{work}</CardTitle></Card>
                            {!work.includes("HandOver")&&<div className="h-10 w-px bg-neutral-300 mt-2"/>}
                            {!work.includes("HandOver")&&<ChevronDown size={20} className="text-neutral-400 mb-2"/>}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default ServiceClient