"use client";

import { useState } from "react";
import { contactSubmissions as initialContacts } from "@/data/contacts";
import type { ContactSubmission } from "@/types";
import {
  Mail,
  Phone,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { ViewContactModal } from "./_components/ViewContactModal";
import { EditContactModal } from "./_components/EditContactModal";
import { AddContactModal } from "./_components/AddContactModal";
import { CustomTable, Column, ColumnFilter } from "@/components/CustomTable";

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
  const [selectedContact, setSelectedContact] =
    useState<ContactSubmission | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<
    Partial<ContactSubmission>
  >({});
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleViewContact = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleEditContact = (contact: ContactSubmission) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  const handleAddContact = (
    newContact: Omit<ContactSubmission, "id" | "createdAt">
  ) => {
    const contact: ContactSubmission = {
      ...newContact,
      id: `contact-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setContacts((prev) => [contact, ...prev]);
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

  // Define columns for CustomTable
  const columns: Column<ContactSubmission>[] = [
    {
      key: "name",
      label: "Contact",
      sortable: true,
      searchable: true,
      exportable: true,
      width: "250px",
      render: (value, row) => (
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
            <Mail className="w-4 h-4" />
            {row.email}
          </div>
          {row.phone && (
            <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <Phone className="w-4 h-4" />
              {row.phone}
            </div>
          )}
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
      key: "phone",
      label: "Phone",
      exportable: true,
      className: "hidden",
    },
    {
      key: "message",
      label: "Message",
      searchable: true,
      exportable: true,
      width: "300px",
      render: (value) => (
        <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
          {value}
        </div>
      ),
    },
    {
      key: "source",
      label: "Source",
      sortable: true,
      exportable: true,
      width: "120px",
      render: (value) => (
        <span className="text-sm text-muted-foreground capitalize">{value}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      exportable: true,
      width: "140px",
      render: (value: ContactSubmission["status"]) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
            statusColors[value]
          }`}
        >
          {statusLabels[value]}
        </span>
      ),
      exportRender: (value) => statusLabels[value as ContactSubmission["status"]],
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      exportable: true,
      width: "140px",
      render: (value) => (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(value).toLocaleDateString()}
        </div>
      ),
      exportRender: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  // Define filters for CustomTable
  const filters: ColumnFilter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "New", value: "new" },
        { label: "In Review", value: "in-review" },
        { label: "Contacted", value: "contacted" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      key: "source",
      label: "Source",
      options: [
        { label: "Website", value: "website" },
        { label: "Manual", value: "manual" },
        { label: "Email", value: "email" },
        { label: "Phone", value: "phone" },
        { label: "Social", value: "social" },
        { label: "Referral", value: "referral" },
      ],
    },
  ];

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
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
        >
          <Plus className="w-5 h-5" />
          Add Contact
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="p-4 rounded-xl border-2 border-border bg-card"
          >
            <div className="text-3xl font-bold text-foreground mb-1">
              {count}
            </div>
            <div className="text-sm font-medium text-muted-foreground capitalize">
              {status === "all"
                ? "Total"
                : statusLabels[status as keyof typeof statusLabels]}
            </div>
          </div>
        ))}
      </div>

      {/* Contacts Table */}
      <CustomTable
        data={contacts}
        columns={columns}
        searchable
        searchPlaceholder="Search contacts by name, email, or message..."
        searchKeys={["name", "email", "message"]}
        filters={filters}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        defaultSortKey="createdAt"
        defaultSortDirection="desc"
        exportable
        exportFilename="contacts_export.csv"
        actions={(contact) => (
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
        )}
        emptyIcon={<Mail className="w-12 h-12 opacity-50" />}
        emptyMessage="No contacts found"
      />

      {/* Add Modal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddContact}
      />

      {/* View Modal */}
      <ViewContactModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contact={selectedContact}
      />

      {/* Edit Modal */}
      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        contact={editingContact}
        onContactChange={setEditingContact}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
