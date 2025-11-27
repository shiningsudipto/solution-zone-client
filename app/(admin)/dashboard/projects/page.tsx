"use client";

import { useState } from "react";
import { projects as initialProjects } from "@/data/projects";
import type { Project } from "@/types";
import {
  Briefcase,
  Calendar,
  User,
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  X,
  Users,
  TrendingUp,
} from "lucide-react";

const statusColors = {
  proposal: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  active: "bg-green-500/10 text-green-600 border-green-500/20",
  "on-hold": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  completed: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  archived: "bg-gray-500/10 text-gray-600 border-gray-500/20",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project>>({});

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingProject.id) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id ? { ...p, ...editingProject } : p
        )
      );
      setIsEditModalOpen(false);
      setEditingProject({});
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const statusCounts = {
    all: projects.length,
    proposal: projects.filter((p) => p.status === "proposal").length,
    active: projects.filter((p) => p.status === "active").length,
    "on-hold": projects.filter((p) => p.status === "on-hold").length,
    completed: projects.filter((p) => p.status === "completed").length,
    archived: projects.filter((p) => p.status === "archived").length,
  };

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
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25">
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

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Progress
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Members
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-foreground">
                        {project.name}
                      </div>
                      {project.description && (
                        <div className="text-sm text-muted-foreground line-clamp-1 mt-1">
                          {project.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {project.client}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[project.status]
                      }`}
                    >
                      {statusLabels[project.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground space-y-1">
                      {project.startDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                      )}
                      {project.endDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.endDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {project.members.length} members
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No projects found</p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Project Details
              </h2>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <FileText className="w-4 h-4" />
                  Project Name
                </div>
                <div className="text-lg font-medium">{selectedProject.name}</div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Briefcase className="w-4 h-4" />
                  Client
                </div>
                <div className="text-lg">{selectedProject.client}</div>
              </div>

              {selectedProject.description && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <FileText className="w-4 h-4" />
                    Description
                  </div>
                  <div className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
                    {selectedProject.description}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Status
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[selectedProject.status]
                    }`}
                  >
                    {statusLabels[selectedProject.status]}
                  </span>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Progress
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {selectedProject.progress}%
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${selectedProject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedProject.startDate && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Start Date
                    </div>
                    <div className="font-medium">
                      {new Date(selectedProject.startDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
                {selectedProject.endDate && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      End Date
                    </div>
                    <div className="font-medium">
                      {new Date(selectedProject.endDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Team Members
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">
                    {selectedProject.members.length} members
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedProject.members.map((memberId) => (
                    <span
                      key={memberId}
                      className="px-3 py-1 bg-muted/50 rounded-lg text-sm"
                    >
                      {memberId}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.tags && selectedProject.tags.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Created
                  </div>
                  <div className="font-medium">
                    {new Date(selectedProject.createdAt).toLocaleString()}
                  </div>
                </div>
                {selectedProject.updatedAt && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Last Updated
                    </div>
                    <div className="font-medium">
                      {new Date(selectedProject.updatedAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Edit Project
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={editingProject.name || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client
                </label>
                <input
                  type="text"
                  value={editingProject.client || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      client: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={editingProject.status}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      status: e.target.value as Project["status"],
                    })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="proposal">Proposal</option>
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingProject.progress || 0}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      progress: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="mt-2 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${editingProject.progress || 0}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editingProject.startDate || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={editingProject.endDate || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={editingProject.description || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Add project description..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
