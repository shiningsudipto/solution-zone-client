"use client";

import { CustomModal } from "@/components/CustomModal";
import { teamMembers } from "@/data/team";
import type { Task } from "@/types";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Partial<Task>;
  onTaskChange: (task: Partial<Task>) => void;
  onSave: () => void;
}

export function EditTaskModal({
  isOpen,
  onClose,
  task,
  onTaskChange,
  onSave,
}: EditTaskModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Task"
      size="xl"
      footer={
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Save Changes
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Title
          </label>
          <input
            type="text"
            value={task.title || ""}
            onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            value={task.description || ""}
            onChange={(e) =>
              onTaskChange({ ...task, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Task description..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              value={task.status}
              onChange={(e) =>
                onTaskChange({ ...task, status: e.target.value as Task["status"] })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Priority
            </label>
            <select
              value={task.priority}
              onChange={(e) =>
                onTaskChange({
                  ...task,
                  priority: e.target.value as Task["priority"],
                })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Assigned To
            </label>
            <select
              value={task.assignedTo || ""}
              onChange={(e) =>
                onTaskChange({ ...task, assignedTo: e.target.value || null })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Unassigned</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={task.dueDate || ""}
              onChange={(e) =>
                onTaskChange({ ...task, dueDate: e.target.value || null })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
