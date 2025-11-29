"use client";

import { useState } from "react";
import { teamMembers as initialMembers } from "@/data/team";
import type { TeamMember } from "@/types";
import {
  Users,
  Mail,
  Calendar,
  Plus,
  Search,
  Filter,
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
import { ViewMemberModal } from "./_components/ViewMemberModal";
import { EditMemberModal } from "./_components/EditMemberModal";
import { CreateMemberModal } from "./_components/CreateMemberModal";

const roleColors = {
  "Creative Director": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Lead Developer": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Marketing Strategist": "bg-green-500/10 text-green-600 border-green-500/20",
  "UI/UX Designer": "bg-pink-500/10 text-pink-600 border-pink-500/20",
  "Business Consultant": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "Full Stack Developer": "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
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
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.email &&
        member.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.bio && member.bio.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
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
      setMembers((prev) => [...prev, member]);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Team Members</h1>
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
            {new Date().getFullYear() -
              Math.min(
                ...members
                  .filter((m) => m.joinedAt)
                  .map((m) => new Date(m.joinedAt!).getFullYear())
              )}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Years Active
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search team members..."
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

      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] group"
          >
            <div className="p-6 space-y-4">
              {/* Avatar and Name */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-foreground truncate">
                    {member.name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border mt-2 ${
                      roleColors[member.role as keyof typeof roleColors] ||
                      "bg-gray-500/10 text-gray-600 border-gray-500/20"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Bio */}
              {member.bio && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {member.bio}
                </p>
              )}

              {/* Contact Info */}
              <div className="space-y-2">
                {member.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.joinedAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {member.socials && member.socials.length > 0 && (
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {member.socials.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary"
                      title={social.provider}
                    >
                      {getSocialIcon(social.provider)}
                    </a>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <button
                  onClick={() => handleViewMember(member)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/70 rounded-lg transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  View
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
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-2xl">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No team members found</p>
        </div>
      )}

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
