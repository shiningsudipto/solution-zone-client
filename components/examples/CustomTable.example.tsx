"use client";

import { useState } from "react";
import { CustomTable, Column, ColumnFilter } from "@/components/CustomTable";
import { Mail, Eye, Edit, Trash2, Download, Archive } from "lucide-react";

// Example data type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  lastLogin: string;
}

// Example data
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    createdAt: "2024-02-10",
    lastLogin: "2024-03-19",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "editor",
    status: "inactive",
    createdAt: "2024-01-20",
    lastLogin: "2024-02-15",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "user",
    status: "pending",
    createdAt: "2024-03-01",
    lastLogin: "Never",
  },
];

export function CustomTableExample() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Define columns
  const columns: Column<User>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      searchable: true,
      width: "200px",
      render: (value, row) => (
        <div>
          <div className="font-medium text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      sortable: true,
      filterable: true,
      width: "120px",
      render: (value) => (
        <span className="capitalize px-2 py-1 bg-muted rounded text-sm">
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      width: "120px",
      render: (value) => {
        const colors = {
          active: "bg-green-500/10 text-green-600 border-green-500/20",
          inactive: "bg-gray-500/10 text-gray-600 border-gray-500/20",
          pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
        };
        return (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors[value]}`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      width: "120px",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "lastLogin",
      label: "Last Login",
      sortable: true,
      width: "120px",
      render: (value) =>
        value === "Never" ? (
          <span className="text-muted-foreground">Never</span>
        ) : (
          new Date(value).toLocaleDateString()
        ),
    },
  ];

  // Define filters
  const filters: ColumnFilter[] = [
    {
      key: "role",
      label: "Role",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
      ],
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">CustomTable Examples</h1>
        <p className="text-muted-foreground">
          Comprehensive examples of the CustomTable component
        </p>
      </div>

      {/* Example 1: Basic Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Basic Table</h2>
          <p className="text-muted-foreground">
            Simple table without search, filter, or selection
          </p>
        </div>
        <CustomTable
          data={users}
          columns={columns.slice(0, 3)}
          emptyMessage="No users found"
        />
      </section>

      {/* Example 2: Table with Search */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Table with Search</h2>
          <p className="text-muted-foreground">
            Table with search functionality
          </p>
        </div>
        <CustomTable
          data={users}
          columns={columns}
          searchable
          searchPlaceholder="Search users by name or email..."
          searchKeys={["name", "email"]}
          emptyIcon={<Mail className="w-12 h-12 opacity-50" />}
          emptyMessage="No users match your search"
        />
      </section>

      {/* Example 3: Table with Filters */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Table with Filters</h2>
          <p className="text-muted-foreground">
            Table with column-based filtering
          </p>
        </div>
        <CustomTable
          data={users}
          columns={columns}
          filters={filters}
          emptyMessage="No users match your filters"
        />
      </section>

      {/* Example 4: Table with Selection */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            4. Table with Selection
          </h2>
          <p className="text-muted-foreground">
            Table with row selection and bulk actions
          </p>
        </div>
        <CustomTable
          data={users}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          bulkActions={(selectedUsers) => (
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export ({selectedUsers.length})
              </button>
              <button className="px-3 py-2 border border-border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                <Archive className="w-4 h-4" />
                Archive
              </button>
            </div>
          )}
          emptyMessage="No users available"
        />
      </section>

      {/* Example 5: Full-Featured Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            5. Full-Featured Table
          </h2>
          <p className="text-muted-foreground">
            Table with all features: search, filter, selection, sorting, and
            actions
          </p>
        </div>
        <CustomTable
          data={users}
          columns={columns}
          searchable
          searchPlaceholder="Search users..."
          searchKeys={["name", "email"]}
          filters={filters}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          defaultSortKey="name"
          defaultSortDirection="asc"
          actions={(user) => (
            <div className="flex items-center justify-end gap-2">
              <button
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="View"
              >
                <Eye className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          )}
          bulkActions={(selectedUsers) => (
            <div className="flex gap-2">
              <button className="px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export ({selectedUsers.length})
              </button>
              <button className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
          emptyIcon={<Mail className="w-12 h-12 opacity-50" />}
          emptyMessage="No users found"
          rowClassName={(user) =>
            user.status === "inactive" ? "opacity-60" : ""
          }
        />
      </section>

      {/* Example 7: Table with CSV Export */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            7. Table with CSV Export
          </h2>
          <p className="text-muted-foreground">
            Table with CSV export functionality for all or selected rows
          </p>
        </div>
        <CustomTable
          data={users}
          columns={[
            {
              key: "name",
              label: "Full Name",
              sortable: true,
              exportable: true,
            },
            {
              key: "email",
              label: "Email Address",
              exportable: true,
            },
            {
              key: "role",
              label: "Role",
              exportable: true,
              render: (value) => (
                <span className="capitalize px-2 py-1 bg-muted rounded text-sm">
                  {value}
                </span>
              ),
              exportRender: (value) => value.toUpperCase(),
            },
            {
              key: "status",
              label: "Status",
              exportable: true,
              render: (value: "active" | "inactive" | "pending") => {
                const colors = {
                  active: "bg-green-500/10 text-green-600",
                  inactive: "bg-gray-500/10 text-gray-600",
                  pending: "bg-yellow-500/10 text-yellow-600",
                };
                return (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[value]}`}
                  >
                    {value}
                  </span>
                );
              },
              exportRender: (value) => value.toUpperCase(),
            },
            {
              key: "createdAt",
              label: "Created Date",
              exportable: true,
              render: (value) => new Date(value).toLocaleDateString(),
              exportRender: (value) => new Date(value).toLocaleDateString(),
            },
          ]}
          searchable
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          exportable
          exportFilename="users_export.csv"
        />
      </section>

      {/* Example 8: Compact Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Compact Table</h2>
          <p className="text-muted-foreground">Table with compact styling</p>
        </div>
        <CustomTable
          data={users}
          columns={[
            {
              key: "name",
              label: "Name",
              sortable: true,
            },
            {
              key: "email",
              label: "Email",
            },
            {
              key: "status",
              label: "Status",
              render: (value) => (
                <span className="capitalize text-sm">{value}</span>
              ),
            },
          ]}
          tableClassName="text-sm"
        />
      </section>
    </div>
  );
}

export default CustomTableExample;
