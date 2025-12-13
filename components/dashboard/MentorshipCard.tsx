import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Calendar } from "lucide-react";
// import { Progress } from "@/components/ui/progress";

interface MentorshipCardProps {
  name: string;
  role: "Mentor" | "Mentee";
  progress?: number;
  nextMeeting?: string;
  avatarSeed: string;
}

export function MentorshipCard({ name, role, progress, nextMeeting, avatarSeed }: MentorshipCardProps) {
  return (
    <Card className="p-5 rounded-2xl min-w-[280px] hover:shadow-[var(--shadow-neumorphic)] transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          {/* <Avatar className="w-12 h-12 ring-2 ring-primary/20">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar> */}
          <div className="flex-1">
            <h4 className="font-semibold">{name}</h4>
            <Badge variant="secondary" className="text-xs mt-1">
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
            {/* <Progress value={progress} className="h-2" /> */}
          </div>
        )}

        {/* Next Meeting */}
        {nextMeeting && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/30 rounded-lg p-2">
            <Calendar className="w-4 h-4" />
            <span>{nextMeeting}</span>
          </div>
        )}

        {/* Action */}
        <Button size="sm" className="w-full rounded-xl gap-2" variant="outline">
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>
      </div>
    </Card>
  );
}
