"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { careers as initialCareers } from "@/data/careers";
import type { Career } from "@/types";
import {
  Briefcase,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  Users,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const typeLabels = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const levelLabels = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
  lead: "Lead",
};

const levelColors = {
  entry: "bg-green-500/10 text-green-600 border-green-500/20",
  mid: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  senior: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  lead: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

export default function CareersPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<Career[]>(initialCareers);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter careers
  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || career.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && career.isActive) ||
      (statusFilter === "inactive" && !career.isActive);

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleToggleStatus = (id: string) => {
    setCareers((prev) =>
      prev.map((career) =>
        career.id === id ? { ...career, isActive: !career.isActive } : career
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setCareers((prev) => prev.filter((career) => career.id !== id));
    }
  };

  // Get unique departments
  const departments = Array.from(new Set(careers.map((c) => c.department))).sort();

  // Stats
  const stats = {
    total: careers.length,
    active: careers.filter((c) => c.isActive).length,
    inactive: careers.filter((c) => !c.isActive).length,
    totalApplicants: careers.reduce((sum, c) => sum + (c.applicants || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Career Postings
          </h1>
          <p className="text-muted-foreground">
            Manage job openings and applications
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/careers/create")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
        >
          <Plus className="w-5 h-5" />
          Create Job Posting
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {stats.total}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Total Positions
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {stats.active}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Active Postings
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-gray-600 mb-2">
            {stats.inactive}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Inactive
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-primary mb-2">
            {stats.totalApplicants}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Total Applicants
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Career Listings */}
      <div className="space-y-4">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="p-6">
              <div className="flex gap-6">
                <div className="flex-1 space-y-3">
                  {/* Title and Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {career.title}
                      </h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            levelColors[career.level]
                          }`}
                        >
                          {levelLabels[career.level]}
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            career.isActive
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                          }`}
                        >
                          {career.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      {career.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {career.department}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {career.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {typeLabels[career.type]}
                    </div>
                    {career.salary && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        ${career.salary.min.toLocaleString()} - $
                        {career.salary.max.toLocaleString()}
                      </div>
                    )}
                    {career.applicants !== undefined && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {career.applicants} applicants
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => router.push(`/dashboard/careers/${career.id}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/70 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/dashboard/careers/${career.id}/edit`)
                      }
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(career.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title={career.isActive ? "Deactivate" : "Activate"}
                    >
                      {career.isActive ? (
                        <ToggleRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(career.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-2xl">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No career postings found</p>
        </div>
      )}
    </div>
  );
}
