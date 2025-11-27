"use client";

import { CustomModal } from "@/components/CustomModal";
import { Calendar, User } from "lucide-react";
import type { Task } from "@/types";

const statusColumns = {
  todo: { label: "To Do" },
  "in-progress": { label: "In Progress" },
  review: { label: "Review" },
  done: { label: "Done" },
};

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

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  getTeamMemberName: (id: string | null | undefined) => string;
}

export function ViewTaskModal({
  isOpen,
  onClose,
  task,
  getTeamMemberName,
}: ViewTaskModalProps) {
  if (!task) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Task Details"
      size="xl"
    >
      <div className="space-y-6">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Title</div>
          <div className="text-xl font-semibold">{task.title}</div>
        </div>

        {task.description && (
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Description
            </div>
            <div className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
              {task.description}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <div className="font-medium">
              {statusColumns[task.status].label}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Priority</div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                priorityColors[task.priority]
              }`}
            >
              {priorityLabels[task.priority]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <User className="w-4 h-4" />
              Assigned To
            </div>
            <div className="font-medium">
              {getTeamMemberName(task.assignedTo)}
            </div>
          </div>
          {task.dueDate && (
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                Due Date
              </div>
              <div className="font-medium">
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="text-sm text-muted-foreground mb-1">Created</div>
          <div className="font-medium">
            {new Date(task.createdAt).toLocaleString()}
          </div>
        </div>

        {task.updatedAt && (
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Last Updated
            </div>
            <div className="font-medium">
              {new Date(task.updatedAt).toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
}
