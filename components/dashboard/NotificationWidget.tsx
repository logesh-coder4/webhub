'use server'
import { Bell, UserPlus, CheckCircle, AlertCircle } from "lucide-react";
import { timeSince } from "@/lib/time-stamps";
import { Notification } from "@/lib/generated/prisma/client";


const iconMap = {
  update: Bell,
  request: UserPlus,
  change: CheckCircle,
};

export async function NotificationsWidget({notification}:{notification:Notification}) {
    const Icon = iconMap[notification.type!];
    return (
    <div
        className={`p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer ${
        !notification.isRead ? "bg-accent/20" : ""
        }`}
    >
        <div className="flex gap-3">
        <div className="p-2 rounded-lg bg-primary/10 h-fit">
            <Icon className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-sm">{notification.title}</p>
            {!notification.isRead && (
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
}
