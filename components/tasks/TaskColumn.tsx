"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";
import type { Task } from "@/types";
import type { LucideIcon } from "lucide-react";

interface TaskColumnProps {
  id: string;
  label: string;
  icon: LucideIcon;
  tasks: Task[];
  activeId: string | null;
  activeTaskStatus: Task["status"] | null;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  getTeamMemberName: (id: string | null | undefined) => string;
}

export function TaskColumn({
  id,
  label,
  icon: Icon,
  tasks,
  activeId,
  activeTaskStatus,
  onView,
  onEdit,
  onDelete,
  getTeamMemberName,
}: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-card border-2 rounded-2xl p-4 flex flex-col min-h-[500px] transition-all ${
        activeId && activeTaskStatus !== id
          ? "border-primary/50 bg-primary/5"
          : "border-border"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">{label}</h3>
        </div>
        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Task Cards */}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 flex-1">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {activeId && activeTaskStatus !== id ? "Drop here" : "No tasks"}
            </div>
          ) : (
            tasks.map((task) => (
              <SortableTask
                key={task.id}
                task={task}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                getTeamMemberName={getTeamMemberName}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}
