"use client";

import { useState } from "react";
import { teamMembers as initialMembers } from "@/data/team";
import type { TeamMember } from "@/types";
import {
  Users,
  Mail,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import { CustomTable, Column, ColumnFilter } from "@/components/CustomTable";
import { ViewMemberModal } from "./_components/ViewMemberModal";
import { EditMemberModal } from "./_components/EditMemberModal";
import { CreateMemberModal } from "./_components/CreateMemberModal";

const roleColors = {
  "Creative Director": "bg-purple-100 text-purple-800",
  "Lead Developer": "bg-blue-100 text-blue-800",
  "Marketing Strategist": "bg-green-100 text-green-800",
  "UI/UX Designer": "bg-pink-100 text-pink-800",
  "Business Consultant": "bg-yellow-100 text-yellow-800",
  "Full Stack Developer": "bg-indigo-100 text-indigo-800",
};

const getSocialIcon = (provider: string) => {
  const p = provider.toLowerCase();
  if (p.includes("linkedin")) return <Linkedin className="w-4 h-4" />;
  if (p.includes("twitter")) return <Twitter className="w-4 h-4" />;
  if (p.includes("github")) return <Github className="w-4 h-4" />;
  if (p.includes("dribbble")) return <Dribbble className="w-4 h-4" />;
  if (p.includes("behance")) return <Globe className="w-4 h-4" />;
  return <LinkIcon className="w-4 h-4" />;
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember>>({});
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    email: "",
    bio: "",
    avatar: "",
    socials: [],
  });

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingMember.id) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id ? { ...m, ...editingMember } : m
        )
      );
      setIsEditModalOpen(false);
      setEditingMember({});
    }
  };

  const handleCreateMember = () => {
    if (newMember.name && newMember.role) {
      const member: TeamMember = {
        id: `tm-${Date.now()}`,
        name: newMember.name,
        role: newMember.role,
        email: newMember.email,
        bio: newMember.bio,
        avatar: newMember.avatar,
        socials: newMember.socials || [],
        joinedAt: new Date().toISOString().split("T")[0],
      };
      setMembers((prev) => [member, ...prev]);
      setIsCreateModalOpen(false);
      setNewMember({
        name: "",
        role: "",
        email: "",
        bio: "",
        avatar: "",
        socials: [],
      });
    }
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Get unique roles for stats
  const roles = Array.from(new Set(members.map((m) => m.role)));

  // Column definitions
  const columns: Column<TeamMember>[] = [
    {
      key: "name",
      label: "Member",
      sortable: true,
      searchable: true,
      exportable: true,
      width: "250px",
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {row.avatar ? (
              <img
                src={row.avatar}
                alt={value}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              value.charAt(0)
            )}
          </div>
          <div>
            <div className="font-medium">{value}</div>
            {row.email && (
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3" />
                {row.email}
              </div>
            )}
          </div>
        </div>
      ),
      exportRender: (value) => value,
    },
    {
      key: "email",
      label: "Email",
      exportable: true,
      className: "hidden",
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      filterable: true,
      searchable: true,
      exportable: true,
      render: (value) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            roleColors[value as keyof typeof roleColors] ||
            "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
      exportRender: (value) => value,
    },
    {
      key: "bio",
      label: "Bio",
      exportable: true,
      render: (value) =>
        value ? (
          <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
            {value}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground italic">No bio</span>
        ),
      exportRender: (value) => value || "",
    },
    {
      key: "socials",
      label: "Social Links",
      exportable: false,
      align: "center",
      render: (value) => {
        if (!value || value.length === 0) {
          return (
            <span className="text-sm text-muted-foreground italic">None</span>
          );
        }
        return (
          <div className="flex items-center justify-center gap-1">
            {value.slice(0, 3).map((social: any, idx: number) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-primary"
                title={social.provider}
                onClick={(e) => e.stopPropagation()}
              >
                {getSocialIcon(social.provider)}
              </a>
            ))}
            {value.length > 3 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{value.length - 3}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "joinedAt",
      label: "Joined Date",
      sortable: true,
      exportable: true,
      render: (value) =>
        value ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {new Date(value).toLocaleDateString()}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground italic">Unknown</span>
        ),
      exportRender: (value) =>
        value ? new Date(value).toLocaleDateString() : "",
    },
  ];

  // Filter definitions - get unique roles from data
  const roleOptions = roles.map((role) => ({
    label: role,
    value: role,
  }));

  const filters: ColumnFilter[] = [
    {
      key: "role",
      label: "Role",
      options: roleOptions,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Team Members
          </h1>
          <p className="text-muted-foreground">
            Manage your team members and their information
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {members.length}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Total Members
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {roles.length}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Different Roles
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {members.filter((m) => m.socials && m.socials.length > 0).length}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            With Social Links
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {members.filter((m) => m.joinedAt).length > 0
              ? new Date().getFullYear() -
                Math.min(
                  ...members
                    .filter((m) => m.joinedAt)
                    .map((m) => new Date(m.joinedAt!).getFullYear())
                )
              : 0}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Years Active
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <CustomTable
        data={members}
        columns={columns}
        searchable
        searchPlaceholder="Search team members by name, role, email, or bio..."
        searchKeys={["name", "role", "email", "bio"]}
        filters={filters}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        defaultSortKey="joinedAt"
        defaultSortDirection="desc"
        exportable
        exportFilename="team_members_export.csv"
        actions={(member) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleViewMember(member)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => handleEditMember(member)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => handleDeleteMember(member.id)}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        )}
        emptyIcon={<Users className="w-12 h-12 opacity-50" />}
        emptyMessage="No team members found"
      />

      {/* Modals */}
      <ViewMemberModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        member={selectedMember}
      />

      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={editingMember}
        onMemberChange={setEditingMember}
        onSave={handleSaveEdit}
      />

      <CreateMemberModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        member={newMember}
        onMemberChange={setNewMember}
        onCreate={handleCreateMember}
      />
    </div>
  );
}
