import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, UserPlus, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Notification } from "@/lib/generated/prisma/client";
import { timeSince } from "@/lib/time-stamps";
import { getUserNotificaions } from "@/data/data";


const iconMap = {
  update: Bell,
  request: UserPlus,
  change: CheckCircle,
};

export function NotificationsWidget() {
  const [notifications,setNotifications]=useState<Notification[]>([])
  useEffect(()=>{
    const fetchData=async()=>{
      const data=await getUserNotificaions()
      setNotifications(data)
    }
    fetchData()
  },[])
  return (
    <Card className="rounded-2xl shadow-[var(--shadow-card)]">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Notifications</h3>
          <Badge variant="secondary" className="rounded-full">
            {notifications.filter(n => n.isRead).length} new
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="p-3 space-y-2">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type!];
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer ${
                  notification.isRead ? "bg-accent/20" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 h-fit">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm">{notification.title}</p>
                      {notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{timeSince(notification.createdAt)}</p>
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
