"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, User, Eye, Edit, Trash2 } from "lucide-react";
import type { Task } from "@/types";

const priorityColors = {
  low: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  high: "bg-red-500/10 text-red-600 border-red-500/20",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

interface SortableTaskProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  getTeamMemberName: (id: string | null | undefined) => string;
}

export function SortableTask({
  task,
  onView,
  onEdit,
  onDelete,
  getTeamMemberName,
}: SortableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-background border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group ${
        isDragging ? "ring-2 ring-primary shadow-lg z-50" : ""
      }`}
    >
      {/* Task Title */}
      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Priority Badge */}
      <div className="mb-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
            priorityColors[task.priority]
          }`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      {/* Assigned To */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <User className="w-3.5 h-3.5" />
        {getTeamMemberName(task.assignedTo)}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(task);
          }}
          className="flex-1 p-1.5 hover:bg-muted rounded-lg transition-colors"
          title="View"
        >
          <Eye className="w-4 h-4 text-muted-foreground mx-auto" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(task);
          }}
          className="flex-1 p-1.5 hover:bg-muted rounded-lg transition-colors"
          title="Edit"
        >
          <Edit className="w-4 h-4 text-muted-foreground mx-auto" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="flex-1 p-1.5 hover:bg-red-100 rounded-lg transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4 text-red-600 mx-auto" />
        </button>
      </div>
    </div>
  );
}
