"use client";

import { CustomModal } from "@/components/CustomModal";
import type { ContactSubmission } from "@/types";
import { User, Mail, Phone, FileText, Calendar } from "lucide-react";

interface ViewContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactSubmission | null;
}

const statusColors = {
  new: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "in-review": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  contacted: "bg-green-500/10 text-green-600 border-green-500/20",
  closed: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const statusLabels = {
  new: "New",
  "in-review": "In Review",
  contacted: "Contacted",
  closed: "Closed",
};

export function ViewContactModal({
  isOpen,
  onClose,
  contact,
}: ViewContactModalProps) {
  if (!contact) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Contact Details"
      size="lg"
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <User className="w-4 h-4" />
            Name
          </div>
          <div className="text-lg font-medium">{contact.name}</div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Mail className="w-4 h-4" />
            Email
          </div>
          <div className="text-lg">{contact.email}</div>
        </div>

        {contact.phone && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Phone className="w-4 h-4" />
              Phone
            </div>
            <div className="text-lg">{contact.phone}</div>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <FileText className="w-4 h-4" />
            Message
          </div>
          <div className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
            {contact.message}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Source</div>
            <div className="font-medium">{contact.source}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Status</div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                statusColors[contact.status]
              }`}
            >
              {statusLabels[contact.status]}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Calendar className="w-4 h-4" />
            Submitted
          </div>
          <div className="font-medium">
            {new Date(contact.createdAt).toLocaleString()}
          </div>
        </div>

        {contact.notes && (
          <div>
            <div className="text-sm text-muted-foreground mb-1">Notes</div>
            <div className="text-base bg-muted/30 p-4 rounded-lg">
              {contact.notes}
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
}
