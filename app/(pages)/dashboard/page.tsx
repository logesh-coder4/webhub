import { auth } from '@/auth'
import { MentorshipCard } from '@/components/dashboard/MentorshipCard'
import { NotificationsWidget } from '@/components/dashboard/NotificationWidget'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getUserNotificaions } from '@/data/data'
import { getUserProjects } from '@/data/project'
import { IconBell, IconFolderCode } from '@tabler/icons-react'
import { CheckCircle, FolderKanban, Plus, RefreshCcwIcon, Rocket, Users } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata:Metadata={
    title: "Dashboard",
    description:"Manage your projects, track progress, view updates, and control everything from one central dashboard."
}

const Dashboard = async() => {
    const session=await auth()
    const notifications=await getUserNotificaions()
    if (!session?.user) {
        redirect('/login')
    }
    const {upcoming,otherProjectsCount,webProjectsCount,webProjects,otherProjects,completed,ongoing}=await getUserProjects()
    
    return (
    <div className="flex-1 flex flex-col mt-10">
        {/* Dashboard Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-[1600px] mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">Welcome back, {session?.user?.name} 👋</h1>
              <p className="text-muted-foreground">Here's an overview of your activity.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Projects"
                    value={webProjectsCount!}
                    icon={FolderKanban}
                    colorClass="bg-[hsl(var(--stats-card-1))]"
                    iconColorClass="bg-[hsl(var(--stats-icon-1))]"
                />
                <StatsCard
                    title="Completed Projects"
                    value={completed!}
                    icon={CheckCircle}
                    colorClass="bg-[hsl(var(--stats-card-2))]"
                    iconColorClass="bg-[hsl(var(--stats-icon-2))]"
                />
                <StatsCard
                    title="Upcoming Projects"
                    value={upcoming!}
                    icon={Rocket}
                    colorClass="bg-[hsl(var(--stats-card-3))]"
                    iconColorClass="bg-[hsl(var(--stats-icon-3))]"
                />
                <StatsCard
                    title="Ongoing Projects"
                    value={ongoing!}
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
                  <Button className="rounded-xl gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <Link href='/project-type'>New Project</Link>
                  </Button>
                </div>

                {/* Projects Grid */}
                <ScrollArea>
                    {webProjects&&webProjects!.length!==0?
                    (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-screen">
                                {webProjects!.map(project=>
                                    (<ProjectCard key={project.id} project={project}/>))}
                    </div>
                    ):
                    (<Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <IconFolderCode />
                            </EmptyMedia>
                            <EmptyTitle>No Projects Yet</EmptyTitle>
                            <EmptyDescription>
                                You haven&apos;t created any projects yet. Get started by creating
                                your first project.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button>Create Project</Button>
                        </EmptyContent>
                    </Empty>)
                    }
                </ScrollArea>

                {/* Mentorship Section */}
                {otherProjects&&otherProjects!.length!==0&&
                <div className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold">Mentorship ({otherProjectsCount})</h2>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                        {otherProjects!.map(project=>                    
                            <MentorshipCard
                                key={project.id}
                                name={project.domain?project.domain!:project.projectName!}
                                role={project.service!}
                                projectType={project.projectType!}
                                progress={project.progress}
                                secreatKey={project.secreatKey!}
                                modal={project.model!}
                            />)
                        }
                  </div>
                </div>
                }
              </div>

              {/* Notifications Widget */}
              <div className="lg:col-span-1">
                <Card className="rounded-2xl shadow-[var(--shadow-card)]">
                    <div className="p-5 border-b border-border">
                        <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Recent Notifications</h3>
                        <Badge variant="secondary" className="rounded-full">
                            {notifications.filter(n => !n.isRead).length} new
                        </Badge>
                        </div>
                    </div>
                    {notifications.length!==0?(
                    <ScrollArea className="h-[400px]">
                        <div className="p-3 space-y-2">
                            {notifications.map((notification) => 
                                <NotificationsWidget key={notification.id} notification={notification}/>
                            )}
                        </div>
                    </ScrollArea>
                    ):(
                    <Empty className="from-muted/50 to-background h-full">
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                            <IconBell />
                            </EmptyMedia>
                            <EmptyTitle>No Notifications</EmptyTitle>
                            <EmptyDescription>
                            You&apos;re all caught up. New notifications will appear here.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button variant="outline" size="sm">
                            <RefreshCcwIcon />
                            Refresh
                            </Button>
                        </EmptyContent>
                    </Empty>
                    )}
                </Card>
              </div>
            </div>
          </div>
        </main>
    </div>
    )
}

export default Dashboard