"use client";

import { useState } from "react";
import { contactSubmissions as initialContacts } from "@/data/contacts";
import type { ContactSubmission } from "@/types";
import {
  Mail,
  Phone,
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
} from "lucide-react";

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

export default function ContactsPage() {
  const [contacts, setContacts] =
    useState<ContactSubmission[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmission | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<
    Partial<ContactSubmission>
  >({});

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewContact = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleEditContact = (contact: ContactSubmission) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingContact.id) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContact.id ? { ...c, ...editingContact } : c
        )
      );
      setIsEditModalOpen(false);
      setEditingContact({});
    }
  };

  const handleDeleteContact = (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const statusCounts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    "in-review": contacts.filter((c) => c.status === "in-review").length,
    contacted: contacts.filter((c) => c.status === "contacted").length,
    closed: contacts.filter((c) => c.status === "closed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Contacts</h1>
          <p className="text-muted-foreground">
            Manage and track all contact submissions
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25">
          <Plus className="w-5 h-5" />
          Add Contact
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
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
            placeholder="Search contacts..."
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

      {/* Contacts Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Source
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-foreground">
                        {contact.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </div>
                      {contact.phone && (
                        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                      {contact.message}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {contact.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[contact.status]
                      }`}
                    >
                      {statusLabels[contact.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleEditContact(contact)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
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

        {filteredContacts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No contacts found</p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Contact Details
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
                  <User className="w-4 h-4" />
                  Name
                </div>
                <div className="text-lg font-medium">
                  {selectedContact.name}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Mail className="w-4 h-4" />
                  Email
                </div>
                <div className="text-lg">{selectedContact.email}</div>
              </div>

              {selectedContact.phone && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Phone className="w-4 h-4" />
                    Phone
                  </div>
                  <div className="text-lg">{selectedContact.phone}</div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <FileText className="w-4 h-4" />
                  Message
                </div>
                <div className="text-base leading-relaxed bg-muted/30 p-4 rounded-lg">
                  {selectedContact.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Source
                  </div>
                  <div className="font-medium">{selectedContact.source}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Status
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[selectedContact.status]
                    }`}
                  >
                    {statusLabels[selectedContact.status]}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Submitted
                </div>
                <div className="font-medium">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </div>
              </div>

              {selectedContact.notes && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Notes
                  </div>
                  <div className="text-base bg-muted/30 p-4 rounded-lg">
                    {selectedContact.notes}
                  </div>
                </div>
              )}
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
                Edit Contact
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
                  Status
                </label>
                <select
                  value={editingContact.status}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
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
                  value={editingContact.notes || ""}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      notes: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Add notes about this contact..."
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
