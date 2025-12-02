"use client";

import { useState } from "react";
import { projects as initialProjects } from "@/data/projects";
import type { Project } from "@/types";
import {
  Briefcase,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
} from "lucide-react";
import { CustomTable, Column, ColumnFilter } from "@/components/CustomTable";
import { ViewProjectModal } from "./_components/ViewProjectModal";
import { EditProjectModal } from "./_components/EditProjectModal";
import { AddProjectModal } from "./_components/AddProjectModal";

const statusColors = {
  proposal: "bg-blue-100 text-blue-800",
  active: "bg-green-100 text-green-800",
  "on-hold": "bg-yellow-100 text-yellow-800",
  completed: "bg-purple-100 text-purple-800",
  archived: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  proposal: "Proposal",
  active: "Active",
  "on-hold": "On Hold",
  completed: "Completed",
  archived: "Archived",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleProjectChange = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleSaveEdit = () => {
    // Data is already updated via handleProjectChange
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleAddProject = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [newProject, ...prev]);
  };

  const statusCounts = {
    all: projects.length,
    proposal: projects.filter((p) => p.status === "proposal").length,
    active: projects.filter((p) => p.status === "active").length,
    "on-hold": projects.filter((p) => p.status === "on-hold").length,
    completed: projects.filter((p) => p.status === "completed").length,
    archived: projects.filter((p) => p.status === "archived").length,
  };

  // Column definitions
  const columns: Column<Project>[] = [
    {
      key: "name",
      label: "Project",
      sortable: true,
      searchable: true,
      exportable: true,
      width: "250px",
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          {row.description && (
            <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
              {row.description.replace(/<[^>]*>/g, "")}
            </div>
          )}
        </div>
      ),
      exportRender: (value) => value,
    },
    {
      key: "client",
      label: "Client",
      sortable: true,
      searchable: true,
      exportable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{value}</span>
        </div>
      ),
      exportRender: (value) => value,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      exportable: true,
      align: "center",
      render: (value) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[value as keyof typeof statusColors]
          }`}
        >
          {statusLabels[value as keyof typeof statusLabels]}
        </span>
      ),
      exportRender: (value) =>
        statusLabels[value as keyof typeof statusLabels],
    },
    {
      key: "progress",
      label: "Progress",
      sortable: true,
      exportable: true,
      render: (value) => (
        <div className="space-y-1 min-w-[120px]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">{value}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ),
      exportRender: (value) => `${value}%`,
    },
    {
      key: "startDate",
      label: "Start Date",
      sortable: true,
      exportable: true,
      className: "hidden",
    },
    {
      key: "endDate",
      label: "End Date",
      sortable: true,
      exportable: true,
      className: "hidden",
    },
    {
      key: "dates",
      label: "Dates",
      exportable: false,
      render: (_, row) => (
        <div className="text-sm text-muted-foreground space-y-1">
          {row.startDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(row.startDate).toLocaleDateString()}
            </div>
          )}
          {row.endDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(row.endDate).toLocaleDateString()}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "members",
      label: "Members",
      exportable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {value.length} {value.length === 1 ? "member" : "members"}
          </span>
        </div>
      ),
      exportRender: (value) => value.length.toString(),
    },
  ];

  // Filter definitions
  const filters: ColumnFilter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Proposal", value: "proposal" },
        { label: "Active", value: "active" },
        { label: "On Hold", value: "on-hold" },
        { label: "Completed", value: "completed" },
        { label: "Archived", value: "archived" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              statusFilter === status
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="text-3xl font-bold text-foreground mb-1">
              {count}
            </div>
            <div className="text-sm font-medium text-muted-foreground capitalize">
              {status === "all"
                ? "Total"
                : statusLabels[status as keyof typeof statusLabels]}
            </div>
          </button>
        ))}
      </div>

      {/* Projects Table */}
      <CustomTable
        data={projects}
        columns={columns}
        searchable
        searchPlaceholder="Search projects by name, client, or description..."
        searchKeys={["name", "client", "description"]}
        filters={filters}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        defaultSortKey="createdAt"
        defaultSortDirection="desc"
        exportable
        exportFilename="projects_export.csv"
        actions={(project) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleViewProject(project)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => handleEditProject(project)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
        emptyIcon={<Briefcase className="w-12 h-12 opacity-50" />}
        emptyMessage="No projects found"
      />

      {/* View Modal */}
      <ViewProjectModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        project={selectedProject}
      />

      {/* Edit Modal */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={selectedProject}
        onProjectChange={handleProjectChange}
        onSave={handleSaveEdit}
      />

      {/* Add Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProject}
      />
    </div>
  );
}
