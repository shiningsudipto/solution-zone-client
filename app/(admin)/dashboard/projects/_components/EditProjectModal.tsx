"use client";

import { useState } from "react";
import { CustomModal } from "@/components/CustomModal";
import { Project } from "@/types/collections";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onProjectChange: (project: Project) => void;
  onSave: () => void;
}

export function EditProjectModal({
  isOpen,
  onClose,
  project,
  onProjectChange,
  onSave,
}: EditProjectModalProps) {
  if (!project) return null;

  const [localProject, setLocalProject] = useState(project);

  const handleSave = () => {
    onProjectChange(localProject);
    onSave();
    onClose();
  };

  const handleCancel = () => {
    setLocalProject(project);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Edit Project"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Save Changes
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={localProject.name}
            onChange={(e) =>
              setLocalProject({ ...localProject, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Client */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Client <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={localProject.client}
            onChange={(e) =>
              setLocalProject({ ...localProject, client: e.target.value })
            }
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={localProject.status}
            onChange={(e) =>
              setLocalProject({
                ...localProject,
                status: e.target.value as Project["status"],
              })
            }
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Progress */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Progress ({localProject.progress}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={localProject.progress}
            onChange={(e) =>
              setLocalProject({
                ...localProject,
                progress: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${localProject.progress}%` }}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={localProject.startDate}
              onChange={(e) =>
                setLocalProject({
                  ...localProject,
                  startDate: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={localProject.endDate}
              onChange={(e) =>
                setLocalProject({
                  ...localProject,
                  endDate: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={localProject.description?.replace(/<[^>]*>/g, "") || ""}
            onChange={(e) =>
              setLocalProject({
                ...localProject,
                description: e.target.value,
              })
            }
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Enter project description..."
          />
        </div>
      </div>
    </CustomModal>
  );
}
