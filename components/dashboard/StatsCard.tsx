import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorClass: string;
  iconColorClass: string;
}

export function StatsCard({ title, value, icon: Icon, colorClass, iconColorClass }: StatsCardProps) {
  return (
    <Card className={`p-6 rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-neumorphic)] transition-all duration-300 hover:-translate-y-1 ${colorClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className={`p-4 rounded-2xl ${iconColorClass}`}>
          <Icon className="w-7 h-7 text-background" />
        </div>
      </div>
    </Card>
  );
}
