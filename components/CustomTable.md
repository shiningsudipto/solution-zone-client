# CustomTable Component

A comprehensive, reusable table component with search, filtering, sorting, selection, bulk actions, and CSV export.

## Features

- ✅ **Search**: Full-text search across specified columns
- ✅ **Filtering**: Column-based filters with dropdown menus
- ✅ **Sorting**: Click column headers to sort (ascending/descending)
- ✅ **Selection**: Row selection with "Select All" functionality
- ✅ **CSV Export**: Export all data or only selected rows to CSV
- ✅ **Bulk Actions**: Custom actions for selected rows
- ✅ **Custom Rendering**: Complete control over cell rendering
- ✅ **Empty States**: Customizable empty state with icon and message
- ✅ **Responsive**: Horizontal scroll on smaller screens
- ✅ **Styled**: Uses existing UI components (Table, Checkbox, CustomPopover)

## Installation

The component uses:

- `@/components/ui/table` - Base table components
- `@/components/ui/checkbox` - Checkbox for selection
- `@/components/CustomPopover` - Filter dropdowns
- `lucide-react` - Icons

## Basic Usage

```tsx
import { CustomTable, Column } from "@/components/CustomTable";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
];

const columns: Column<User>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", searchable: true },
  { key: "role", label: "Role", filterable: true },
];

export function UsersTable() {
  return <CustomTable data={users} columns={columns} />;
}
```

## Props

### Core Props

| Prop      | Type          | Default  | Description              |
| --------- | ------------- | -------- | ------------------------ |
| `data`    | `T[]`         | required | Array of data to display |
| `columns` | `Column<T>[]` | required | Column definitions       |

### Search Props

| Prop                | Type                      | Default       | Description                                     |
| ------------------- | ------------------------- | ------------- | ----------------------------------------------- |
| `searchable`        | `boolean`                 | `false`       | Enable search functionality                     |
| `searchPlaceholder` | `string`                  | `"Search..."` | Search input placeholder                        |
| `searchKeys`        | `string[]`                | `[]`          | Keys to search (defaults to searchable columns) |
| `onSearch`          | `(query: string) => void` | -             | Callback when search changes                    |

### Filter Props

| Prop       | Type                                        | Default | Description                  |
| ---------- | ------------------------------------------- | ------- | ---------------------------- |
| `filters`  | `ColumnFilter[]`                            | `[]`    | Filter definitions           |
| `onFilter` | `(filters: Record<string, string>) => void` | -       | Callback when filters change |

### Selection Props

| Prop                | Type                      | Default           | Description                     |
| ------------------- | ------------------------- | ----------------- | ------------------------------- |
| `selectable`        | `boolean`                 | `false`           | Enable row selection            |
| `selectedRows`      | `string[]`                | `[]`              | Array of selected row IDs       |
| `onSelectionChange` | `(ids: string[]) => void` | -                 | Callback when selection changes |
| `getRowId`          | `(row: T) => string`      | `(row) => row.id` | Function to get unique row ID   |

### Sorting Props

| Prop                   | Type                                                | Default | Description                |
| ---------------------- | --------------------------------------------------- | ------- | -------------------------- |
| `defaultSortKey`       | `string`                                            | -       | Initial sort column        |
| `defaultSortDirection` | `"asc" \| "desc"`                                   | `"asc"` | Initial sort direction     |
| `onSort`               | `(key: string, direction: "asc" \| "desc") => void` | -       | Callback when sort changes |

### CSV Export Props

| Prop             | Type                  | Default        | Description                     |
| ---------------- | --------------------- | -------------- | ------------------------------- |
| `exportable`     | `boolean`             | `false`        | Enable CSV export functionality |
| `exportFilename` | `string`              | auto-generated | Custom filename for CSV export  |
| `exportColumns`  | `string[]`            | all exportable | Specific columns to export      |
| `onExport`       | `(data: T[]) => void` | -              | Custom export handler           |

### Actions Props

| Prop          | Type                                   | Default | Description         |
| ------------- | -------------------------------------- | ------- | ------------------- |
| `actions`     | `(row: T, index: number) => ReactNode` | -       | Row action buttons  |
| `bulkActions` | `(selectedRows: T[]) => ReactNode`     | -       | Bulk action buttons |

### Empty State Props

| Prop           | Type        | Default           | Description                  |
| -------------- | ----------- | ----------------- | ---------------------------- |
| `emptyState`   | `ReactNode` | -                 | Custom empty state component |
| `emptyIcon`    | `ReactNode` | -                 | Icon for default empty state |
| `emptyMessage` | `string`    | `"No data found"` | Message for empty state      |

### Styling Props

| Prop             | Type                                            | Default | Description          |
| ---------------- | ----------------------------------------------- | ------- | -------------------- |
| `className`      | `string`                                        | -       | Container class name |
| `tableClassName` | `string`                                        | -       | Table class name     |
| `rowClassName`   | `string \| ((row: T, index: number) => string)` | -       | Row class name       |

## Column Definition

```tsx
interface Column<T> {
  key: string; // Data key
  label: string; // Column header label
  sortable?: boolean; // Enable sorting
  filterable?: boolean; // Enable filtering
  searchable?: boolean; // Include in search
  exportable?: boolean; // Include in CSV export (default: true)
  width?: string; // Column width (e.g., "200px")
  align?: "left" | "center" | "right"; // Text alignment
  render?: (value: any, row: T, index: number) => ReactNode; // Custom renderer for display
  exportRender?: (value: any, row: T) => string; // Custom renderer for CSV export
  className?: string; // Cell class name
  headerClassName?: string; // Header cell class name
}
```

## Filter Definition

```tsx
interface ColumnFilter {
  key: string; // Column key to filter
  label: string; // Filter button label
  options: FilterOption[]; // Filter options
}

interface FilterOption {
  label: string; // Option display label
  value: string; // Option value
}
```

## Examples

### 1. Simple Table

```tsx
<CustomTable
  data={users}
  columns={[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
  ]}
/>
```

### 2. Searchable Table

```tsx
<CustomTable
  data={users}
  columns={columns}
  searchable
  searchPlaceholder="Search users..."
  searchKeys={["name", "email"]}
/>
```

### 3. Table with Filters

```tsx
const filters = [
  {
    key: "role",
    label: "Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
    ],
  },
  {
    key: "status",
    label: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

<CustomTable data={users} columns={columns} filters={filters} />;
```

### 4. Table with Selection

```tsx
const [selectedRows, setSelectedRows] = useState<string[]>([]);

<CustomTable
  data={users}
  columns={columns}
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
  bulkActions={(selectedUsers) => (
    <button onClick={() => exportUsers(selectedUsers)}>
      Export ({selectedUsers.length})
    </button>
  )}
/>;
```

### 5. Table with Custom Rendering

```tsx
const columns: Column<User>[] = [
  {
    key: "name",
    label: "User",
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.email}</div>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <span className={`badge badge-${value}`}>{value}</span>,
  },
];

<CustomTable data={users} columns={columns} />;
```

### 6. Table with Row Actions

```tsx
<CustomTable
  data={users}
  columns={columns}
  actions={(user) => (
    <div className="flex gap-2">
      <button onClick={() => viewUser(user)}>
        <Eye className="w-4 h-4" />
      </button>
      <button onClick={() => editUser(user)}>
        <Edit className="w-4 h-4" />
      </button>
      <button onClick={() => deleteUser(user)}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )}
/>
```

### 7. Table with CSV Export

```tsx
const [selectedRows, setSelectedRows] = useState<string[]>([]);

<CustomTable
  data={users}
  columns={[
    {
      key: "name",
      label: "Full Name",
      exportable: true,
    },
    {
      key: "status",
      label: "Status",
      exportable: true,
      render: (value) => <StatusBadge status={value} />,
      exportRender: (value) => value.toUpperCase(), // Export as uppercase
    },
    {
      key: "createdAt",
      label: "Created Date",
      exportable: true,
      render: (value) => new Date(value).toLocaleDateString(),
      exportRender: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "avatar",
      label: "Avatar",
      exportable: false, // Don't include in export
      render: (value) => <img src={value} alt="avatar" />,
    },
  ]}
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
  exportable
  exportFilename="users_export.csv"
/>;
```

**Export Behavior:**

- If rows are selected: Shows "Export Selected (N)" button (exports only selected rows)
- If no rows selected: Shows "Export All" button (exports all data)
- Uses `exportRender` if provided, otherwise uses raw value
- Respects `exportable: false` to exclude columns
- Auto-generates filename with timestamp if not provided

### 8. Full-Featured Table

```tsx
const [selectedRows, setSelectedRows] = useState<string[]>([]);

<CustomTable
  data={contacts}
  columns={[
    {
      key: "name",
      label: "Contact",
      sortable: true,
      searchable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ]}
  searchable
  searchPlaceholder="Search contacts..."
  filters={[
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
  ]}
  selectable
  selectedRows={selectedRows}
  onSelectionChange={setSelectedRows}
  defaultSortKey="createdAt"
  defaultSortDirection="desc"
  actions={(contact) => (
    <div className="flex gap-2">
      <button onClick={() => handleView(contact)}>View</button>
      <button onClick={() => handleEdit(contact)}>Edit</button>
      <button onClick={() => handleDelete(contact)}>Delete</button>
    </div>
  )}
  bulkActions={(selected) => (
    <div className="flex gap-2">
      <button>Export ({selected.length})</button>
      <button>Delete</button>
    </div>
  )}
  emptyIcon={<Mail className="w-12 h-12" />}
  emptyMessage="No contacts found"
/>;
```

## Advanced Features

### External Search/Filter Control

You can control search and filters externally:

```tsx
const [searchQuery, setSearchQuery] = useState("");
const [activeFilters, setActiveFilters] = useState({});

// Filter data externally
const filteredData = useMemo(() => {
  return data.filter((item) => {
    // Your custom filter logic
  });
}, [data, searchQuery, activeFilters]);

<CustomTable
  data={filteredData}
  columns={columns}
  searchable
  onSearch={setSearchQuery}
  filters={filters}
  onFilter={setActiveFilters}
/>;
```

### Custom Empty State

```tsx
<CustomTable
  data={[]}
  columns={columns}
  emptyState={
    <div className="text-center py-12">
      <Mail className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Users Yet</h3>
      <p className="text-muted-foreground mb-4">
        Get started by adding your first user
      </p>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  }
/>
```

### Conditional Row Styling

```tsx
<CustomTable
  data={users}
  columns={columns}
  rowClassName={(user) => (user.status === "inactive" ? "opacity-60" : "")}
/>
```

## See Also

- [CustomTable.example.tsx](.examples/CustomTable.example.tsx) - Complete examples
- [CustomModal](./CustomModal.tsx) - Modal component
- [CustomPopover](./CustomPopover.tsx) - Popover component
