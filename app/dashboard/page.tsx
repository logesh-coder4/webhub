'use client'
import { MentorshipCard } from '@/components/dashboard/MentorshipCard'
import { NotificationsWidget } from '@/components/dashboard/NotificationWidget'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getUserProjects } from '@/data/project'
import { OtherProjects, WebProjects } from '@/lib/generated/prisma/client'
import { timeSince } from '@/lib/time-stamps'
import { CheckCircle, FolderKanban, Plus, Rocket, Users } from 'lucide-react'
import React, { Suspense, useEffect, useState } from 'react'

type ProjectCountType={
    totalProjectsCount:number|undefined|0
    otherProjectsCount:number|undefined|0
    webProjectsCount:number|undefined|0
    completed:number|undefined|0
    ongoing:number|undefined|0
}

const WebProjectSkeleton=()=>{
    return (
        <Skeleton>
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                <div>
                    <Skeleton/>
                    <Skeleton/>
                </div>
                <Skeleton className='rounded-full' />
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Skeleton/>
                    <Skeleton/>
                </div>

                {/* Action */}
                <Skeleton className='w-80'/>
            </div>
        </Skeleton>
    )
}

const Dashboard = () => {
    const [projectCount,setProjectCount]=useState<ProjectCountType>()
    const [webProjects,setWebProjects]=useState<WebProjects[]>([])
    const [otherProjects,setOtherProjects]=useState<OtherProjects[]>([])
    useEffect(()=>{
        const fetchData=async () => {
            const {totalProjectsCount,otherProjectsCount,webProjectsCount,isSuccess,webProjects,otherProjects,completed,ongoing}=await getUserProjects()
            if (isSuccess) {
                setProjectCount({totalProjectsCount,otherProjectsCount,webProjectsCount,completed,ongoing})
                setWebProjects(webProjects!)
                setOtherProjects(otherProjects!)
            }
        }
        fetchData()
    },[])
    return (
    <div className="flex-1 flex flex-col mt-10">
        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Welcome back, Logesh 👋</h1>
              <p className="text-muted-foreground">Here's an overview of your activity.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Projects"
                value={projectCount?.totalProjectsCount!}
                icon={FolderKanban}
                colorClass="bg-[hsl(var(--stats-card-1))]"
                iconColorClass="bg-[hsl(var(--stats-icon-1))]"
              />
              <StatsCard
                title="Completed Projects"
                value={projectCount?.completed!}
                icon={CheckCircle}
                colorClass="bg-[hsl(var(--stats-card-2))]"
                iconColorClass="bg-[hsl(var(--stats-icon-2))]"
              />
              <StatsCard
                title="Active Projects"
                value={projectCount?.webProjectsCount!}
                icon={Rocket}
                colorClass="bg-[hsl(var(--stats-card-3))]"
                iconColorClass="bg-[hsl(var(--stats-icon-3))]"
              />
              <StatsCard
                title="Ongoing Mentorships"
                value={projectCount?.ongoing!}
                icon={Users}
                colorClass="bg-[hsl(var(--stats-card-4))]"
                iconColorClass="bg-[hsl(var(--stats-icon-4))]"
              />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Projects</h2>
                  <Button className="rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all">
                    <Plus className="w-4 h-4" />
                    New Project
                  </Button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {webProjects.map(project=>
                        (<ProjectCard
                        key={project.id}
                        name={project.name}
                        domain={project.service!}
                        status={project.status}
                        createdDate={timeSince(project.createdAt)!}
                        secreatKey={project.secreatKey!}
                        modal={project.model!}
                    />)
                        )}
                </div>

                {/* Mentorship Section */}
                <div className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold">Mentorship</h2>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                    {otherProjects.map(project=>                    
                    <MentorshipCard
                        key={project.id}
                        name={project.domain?project.domain!:project.projectName!}
                        role={project.service!}
                        projectType={project.projectType!}
                        progress={65}
                        secreatKey={project.secreatKey!}
                        modal={project.model!}
                    />)}
                  </div>
                </div>
              </div>

              {/* Notifications Widget */}
              <div className="lg:col-span-1">
                <NotificationsWidget />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
}

export default Dashboard