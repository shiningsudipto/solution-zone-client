"use client";

import { useState } from "react";
import { CustomModal } from "@/components/CustomModal";
import { Project } from "@/types/collections";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
}

export function AddProjectModal({
  isOpen,
  onClose,
  onAdd,
}: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    description: "",
    status: "planning" as Project["status"],
    progress: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    members: [] as string[],
    tags: [] as string[],
  });

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      alert("Please enter a project name");
      return;
    }

    if (!formData.client.trim()) {
      alert("Please enter a client name");
      return;
    }

    if (!formData.endDate) {
      alert("Please select an end date");
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      alert("End date must be after start date");
      return;
    }

    onAdd(formData);

    // Reset form
    setFormData({
      name: "",
      client: "",
      description: "",
      status: "planning",
      progress: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      members: [],
      tags: [],
    });

    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: "",
      client: "",
      description: "",
      status: "planning",
      progress: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      members: [],
      tags: [],
    });
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Add New Project"
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
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Add Project
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
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter project name"
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
            value={formData.client}
            onChange={(e) =>
              setFormData({ ...formData, client: e.target.value })
            }
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter client name"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
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
            Initial Progress ({formData.progress}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={formData.progress}
            onChange={(e) =>
              setFormData({
                ...formData,
                progress: parseInt(e.target.value),
              })
            }
            className="w-full"
          />
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${formData.progress}%` }}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  startDate: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  endDate: e.target.value,
                })
              }
              min={formData.startDate}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
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
