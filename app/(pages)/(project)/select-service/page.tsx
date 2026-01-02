import { auth } from '@/auth'
import ServiceCard from '@/components/service/ServiceCard'
import { ServiceType } from '@/lib/types'
import { BookOpen, GraduationCap, Layers, Layout, Network, Puzzle, Rocket, ServerCog, Smartphone, TestTube, Users, Wrench } from 'lucide-react'
import { Metadata } from 'next'
import { redirect  } from 'next/navigation'

export const metadata:Metadata={
    title:"Select Service",
    description:"Choose from web development, mobile app development, full-stack solutions, APIs, mentorship, and more."
}

const SelectService = async({searchParams}:{searchParams:Promise<{type:"web"|"others"}>}) => {
    const {type:projectType}=await searchParams
    const session=await auth()
    if (!session?.user) {
        redirect('/login')
    }
    const webServices:ServiceType[]=[
        {
            name:"Frontend Development",
            description:"Create stunning, responsive, and modern interfaces using custom tech stacks",
            icon:<Layout/>,
            query:"frontend"
        },
        {
            name:"Backend Development",
            description:"Build secure and scalable server logic with Node.js, Django, or FastAPI — connected to reliable databases.",
            icon:<ServerCog/>,
            query:"backend"
        },
        {
            name:"Full Stack Development",
            description:"End-to-end development — from database to deployment, we handle everything for your project.",
            icon:<Layers/>,
            query:"fullstack"
        },
        {
            name:"Mobile App Development",
            description:"Develop smooth, high-performance apps using React Native and integrate them with powerful APIs.",
            icon:<Smartphone/>,
            query:"mobileapp"
        },
        {
            name:"API Development",
            description:"Design RESTful or GraphQL APIs that connect your apps and power real-time experiences.",
            icon:<Network/>,
            query:"api"
        },
        {
            name:"Utility Functions",
            description:"Create reusable tools, automation scripts, and helper functions to simplify your workflow.",
            icon:<Puzzle/>,
            query:"utils"
        },
    ]
    const otherServices:ServiceType[]=[
        {
            name:"Mentorship",
            description:"Personalized mentorship to guide your learning, improve coding skills, and clarify real-world concepts.",
            icon:<GraduationCap/>,
            query:"mentorship"
        },
        {
            name:"Project Completion Support",
            description:"Stuck in your college or freelance project? We help you finish your pending tasks and fix blockers.",
            icon:<Wrench/>,
            query:"supporter"
        },
        {
            name:"Learning Guidance",
            description:"Step-by-step guidance with structured learning paths and project-based practice.",
            icon:<BookOpen/>,
            query:"learner"
        },
        {
            name:"Team Worker for Your Project",
            description:"Need extra hands? We collaborate as part of your development team to speed up project delivery.",
            icon:<Users/>,
            query:"worker"
        },
        {
            name:"Full Project Collaboration",
            description:"From start to finish — we join your project as dedicated team members to build and ship your product.",
            icon:<Rocket/>,
            query:"collab"
        },
    ]
    if (projectType!=="web"&&projectType!=="others") {
        redirect('/')
    }
    return (
    <div className='min-h-screen w-full flex items-center justify-center mt-6 lg:mt-0 md:mt-0'>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 m-10">
            {projectType==="web"
            ?webServices.map((service,idx)=><ServiceCard key={idx} service={service} projectType={projectType}/>)
            :otherServices.map((service,idx)=><ServiceCard key={idx} service={service} projectType={projectType}/>)}
        </div>
    </div>
    )
}

export default SelectService