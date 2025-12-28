'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { WebProjects } from "@/lib/generated/prisma/client";
import { useRouter } from "next/navigation";


export function ProjectCard({project}:{project:WebProjects}) {
  const statusColors = {
    "upcoming": "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20",
    "completed": "bg-primary/10 text-primary hover:bg-primary/20",
    "ongoing": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20",
  };
  const router=useRouter()
  return (
    <Card className="p-6 rounded-2xl hover:shadow-[var(--shadow-neumorphic)] transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.service}</p>
          </div>
          <Badge className={`${statusColors[project.status]} capitalize`}>{project.status}</Badge>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Created {new Date(project.createdAt).toDateString()}</span>
        </div>

        {/* Action */}
        
        <Button className="w-full rounded-xl" variant="secondary" onClick={()=>router.push(`/project/${project.secreatKey}/?type=${project.modal}`)}>
          View Project
        </Button>
      </div>
    </Card>
  );
}
