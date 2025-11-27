"use client";

import type { LucideIcon } from "lucide-react";

interface StatusCount {
  total: number;
  [key: string]: number;
}

interface StatusColumn {
  label: string;
  icon: LucideIcon;
  color: string;
}

interface TaskStatsProps {
  statusCounts: StatusCount;
  statusColumns: Record<string, StatusColumn>;
}

export function TaskStats({ statusCounts, statusColumns }: TaskStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div className="p-4 rounded-xl border-2 border-primary bg-primary/10">
        <div className="text-3xl font-bold text-foreground mb-1">
          {statusCounts.total}
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          Total Tasks
        </div>
      </div>
      {Object.keys(statusColumns).map((status) => (
        <div
          key={status}
          className="p-4 rounded-xl border-2 border-border bg-card hover:border-primary/50 transition-all"
        >
          <div className="text-3xl font-bold text-foreground mb-1">
            {statusCounts[status]}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {statusColumns[status].label}
          </div>
        </div>
      ))}
    </div>
  );
}
