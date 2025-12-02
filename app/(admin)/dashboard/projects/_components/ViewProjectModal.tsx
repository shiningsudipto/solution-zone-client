"use client";

import { CustomModal } from "@/components/CustomModal";
import { Project } from "@/types/collections";
import { FileText, Briefcase, TrendingUp, Calendar, Users, Tag } from "lucide-react";

interface ViewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ViewProjectModal({
  isOpen,
  onClose,
  project,
}: ViewProjectModalProps) {
  if (!project) return null;

  const statusColors = {
    planning: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    "on-hold": "bg-gray-100 text-gray-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Project Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <FileText className="w-4 h-4" />
            Project Name
          </div>
          <p className="text-lg font-semibold">{project.name}</p>
        </div>

        {/* Client */}
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Briefcase className="w-4 h-4" />
            Client
          </div>
          <p>{project.client}</p>
        </div>

        {/* Description */}
        {project.description && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <FileText className="w-4 h-4" />
              Description
            </div>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>
        )}

        {/* Status and Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              Status
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[project.status]
              }`}
            >
              {project.status.charAt(0).toUpperCase() +
                project.status.slice(1).replace("-", " ")}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              Start Date
            </div>
            <p>{new Date(project.startDate).toLocaleDateString()}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              End Date
            </div>
            <p>{new Date(project.endDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Members */}
        {project.members && project.members.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Users className="w-4 h-4" />
              Team Members ({project.members.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {project.members.map((memberId) => (
                <span
                  key={memberId}
                  className="inline-flex items-center px-3 py-1 rounded-lg bg-muted text-sm"
                >
                  {memberId}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Tag className="w-4 h-4" />
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Created
            </div>
            <p className="text-sm">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Last Updated
            </div>
            <p className="text-sm">
              {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}
