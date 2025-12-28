'use client'
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import { ProjectType } from "@/lib/generated/prisma/enums";
import { Progress } from "../ui/progress";
import { useRouter } from "next/navigation";


interface MentorshipCardProps {
  name: string;
  role: string;
  progress?: number;
  projectType:ProjectType
  secreatKey:string;
  modal:string;
}

export function MentorshipCard({ name, role, progress,projectType,secreatKey,modal }: MentorshipCardProps) {
  const router=useRouter()
  return (
    <Card className="p-5 rounded-2xl min-w-[280px] hover:shadow-[var(--shadow-neumorphic)] transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h4 className="font-semibold">{name}</h4>
            <Badge variant="secondary" className="text-xs mt-1 capitalize animate-pulse">
              {role}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Next Meeting */}
        {projectType && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/30 rounded-lg p-2">
            <Calendar className="w-4 h-4" />
            <span>{projectType}</span>
          </div>
        )}

        {/* Action */}
        
        <Button size="sm" className="w-full rounded-xl gap-2" variant="outline" onClick={()=>router.push(`/project/${secreatKey}/?type=${modal}`)} >
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>
      </div>
    </Card>
  );
}
