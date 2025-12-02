"use client";

import { CustomModal } from "@/components/CustomModal";
import type { ContactSubmission } from "@/types";

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Partial<ContactSubmission>;
  onContactChange: (contact: Partial<ContactSubmission>) => void;
  onSave: () => void;
}

export function EditContactModal({
  isOpen,
  onClose,
  contact,
  onContactChange,
  onSave,
}: EditContactModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Contact"
      size="lg"
      footer={
        <div className="flex gap-3 w-full">
          <button
            onClick={onSave}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Cancel
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            value={contact.status}
            onChange={(e) =>
              onContactChange({
                ...contact,
                status: e.target.value as ContactSubmission["status"],
              })
            }
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="new">New</option>
            <option value="in-review">In Review</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Notes
          </label>
          <textarea
            value={contact.notes || ""}
            onChange={(e) =>
              onContactChange({
                ...contact,
                notes: e.target.value,
              })
            }
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Add notes about this contact..."
          />
        </div>
      </div>
    </CustomModal>
  );
}
