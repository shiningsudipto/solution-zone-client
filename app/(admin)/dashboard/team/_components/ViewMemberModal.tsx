"use client";

import { CustomModal } from "@/components/CustomModal";
import {
  User,
  Mail,
  Calendar,
  Briefcase,
  Linkedin,
  Twitter,
  Github,
  Dribbble,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import type { TeamMember } from "@/types";

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

interface ViewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

export function ViewMemberModal({
  isOpen,
  onClose,
  member,
}: ViewMemberModalProps) {
  if (!member) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Member Details"
      size="xl"
    >
      <div className="space-y-6">
        {/* Avatar and Name */}
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
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
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <User className="w-4 h-4" />
              Name
            </div>
            <div className="text-2xl font-bold mb-2">{member.name}</div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                roleColors[member.role as keyof typeof roleColors] ||
                "bg-gray-500/10 text-gray-600 border-gray-500/20"
              }`}
            >
              {member.role}
            </span>
          </div>
        </div>

        {member.bio && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Briefcase className="w-4 h-4" />
              Bio
            </div>
            <div className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
              {member.bio}
            </div>
          </div>
        )}

        {member.email && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Mail className="w-4 h-4" />
              Email
            </div>
            <div className="text-lg">{member.email}</div>
          </div>
        )}

        {member.joinedAt && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              Joined Date
            </div>
            <div className="text-lg">
              {new Date(member.joinedAt).toLocaleDateString()}
            </div>
          </div>
        )}

        {member.socials && member.socials.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <LinkIcon className="w-4 h-4" />
              Social Links
            </div>
            <div className="flex flex-wrap gap-3">
              {member.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/70 rounded-lg transition-colors text-sm font-medium"
                >
                  {getSocialIcon(social.provider)}
                  <span className="capitalize">{social.provider}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
}
