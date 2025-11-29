"use client";

import { CustomModal } from "@/components/CustomModal";
import type { TeamMember } from "@/types";

interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Partial<TeamMember>;
  onMemberChange: (member: Partial<TeamMember>) => void;
  onCreate: () => void;
}

export function CreateMemberModal({
  isOpen,
  onClose,
  member,
  onMemberChange,
  onCreate,
}: CreateMemberModalProps) {
  const isValid = member.name && member.role;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Team Member"
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
            onClick={onCreate}
            disabled={!isValid}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Member
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={member.name || ""}
            onChange={(e) => onMemberChange({ ...member, name: e.target.value })}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Member name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={member.role || ""}
            onChange={(e) => onMemberChange({ ...member, role: e.target.value })}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Role or position"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            value={member.email || ""}
            onChange={(e) => onMemberChange({ ...member, email: e.target.value })}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Avatar URL
          </label>
          <input
            type="text"
            value={member.avatar || ""}
            onChange={(e) => onMemberChange({ ...member, avatar: e.target.value })}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Bio
          </label>
          <textarea
            value={member.bio || ""}
            onChange={(e) => onMemberChange({ ...member, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Brief description about the team member..."
          />
        </div>
      </div>
    </CustomModal>
  );
}
