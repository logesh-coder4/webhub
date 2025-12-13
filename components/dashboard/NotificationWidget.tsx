import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, UserPlus, CheckCircle, AlertCircle } from "lucide-react";

interface Notification {
  id: string;
  type: "update" | "request" | "change";
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "request",
    title: "New Mentorship Request",
    description: "Sarah wants to join as your mentee",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    type: "change",
    title: "Project Status Updated",
    description: "E-commerce Platform marked as completed",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    type: "update",
    title: "Team Meeting Scheduled",
    description: "Tomorrow at 3:00 PM - Design Review",
    time: "2 hours ago",
  },
  {
    id: "4",
    type: "update",
    title: "New Comment on Your Project",
    description: "John commented on Mobile App UI",
    time: "3 hours ago",
  },
];

const iconMap = {
  update: Bell,
  request: UserPlus,
  change: CheckCircle,
};

export function NotificationsWidget() {
  return (
    <Card className="rounded-2xl shadow-[var(--shadow-card)]">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Notifications</h3>
          <Badge variant="secondary" className="rounded-full">
            {notifications.filter(n => n.unread).length} new
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-3 space-y-2">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer ${
                  notification.unread ? "bg-accent/20" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 h-fit">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{notification.title}</p>
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}
