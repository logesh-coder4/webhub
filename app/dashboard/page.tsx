import { MentorshipCard } from '@/components/dashboard/MentorshipCard'
import { NotificationsWidget } from '@/components/dashboard/NotificationWidget'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { Button } from '@/components/ui/button'
import { CheckCircle, FolderKanban, Plus, Rocket, Users } from 'lucide-react'
import React from 'react'

const Dashboard = () => {
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
                value={24}
                icon={FolderKanban}
                colorClass="bg-[hsl(var(--stats-card-1))]"
                iconColorClass="bg-[hsl(var(--stats-icon-1))]"
              />
              <StatsCard
                title="Completed Projects"
                value={18}
                icon={CheckCircle}
                colorClass="bg-[hsl(var(--stats-card-2))]"
                iconColorClass="bg-[hsl(var(--stats-icon-2))]"
              />
              <StatsCard
                title="Active Projects"
                value={6}
                icon={Rocket}
                colorClass="bg-[hsl(var(--stats-card-3))]"
                iconColorClass="bg-[hsl(var(--stats-icon-3))]"
              />
              <StatsCard
                title="Ongoing Mentorships"
                value={12}
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
                  <ProjectCard
                    name="E-commerce Platform"
                    domain="Fullstack"
                    status="Active"
                    createdDate="Jan 15, 2025"
                  />
                  <ProjectCard
                    name="Mobile App UI"
                    domain="Frontend"
                    status="In Progress"
                    createdDate="Jan 10, 2025"
                  />
                  <ProjectCard
                    name="REST API Service"
                    domain="Backend"
                    status="Completed"
                    createdDate="Dec 28, 2024"
                  />
                  <ProjectCard
                    name="Analytics Dashboard"
                    domain="Fullstack"
                    status="Active"
                    createdDate="Jan 5, 2025"
                  />
                </div>

                {/* Mentorship Section */}
                <div className="space-y-4 pt-4">
                  <h2 className="text-2xl font-bold">Mentorship</h2>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                    <MentorshipCard
                      name="Sarah Johnson"
                      role="Mentee"
                      progress={65}
                      nextMeeting="Tomorrow, 3:00 PM"
                      avatarSeed="sarah"
                    />
                    <MentorshipCard
                      name="Michael Chen"
                      role="Mentee"
                      progress={42}
                      nextMeeting="Friday, 10:00 AM"
                      avatarSeed="michael"
                    />
                    <MentorshipCard
                      name="Dr. Emily Davis"
                      role="Mentor"
                      nextMeeting="Next Monday, 2:00 PM"
                      avatarSeed="emily"
                    />
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