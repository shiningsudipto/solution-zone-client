# Digital Agency Frontend — README

This frontend-only project represents a complete digital agency platform with public pages and an internal admin dashboard. The goal is to maintain a clean architecture, reusable components, strongly typed collections, and an organized environment for scalable development.

---

## 1. Project Overview

This application includes:

- Public-facing site for a digital agency offering **UI/UX**, **Marketing**, **Web & App Development**, and **Business Consultation** services.
- Blog section with articles and case studies.
- Admin dashboard for managing contacts, projects, tasks, team members, and blog content.
- All create/update operations occur via **modal/popup interfaces**.
- Dummy data is used throughout the app.

## Colors:

- primary: #a44efd,
- secondary: #fd920a,
- accent: #a1d69c,
- background: #fdfbf9 and #fff,
- text: #0f0f0f and when primary and secondary colors are used, text color should be white

---

## 2. Folder Structure — Instructions

This project must maintain a readable, reusable, and scalable structure. Follow these organizational principles:

### **Components**

- Separate UI components, common elements, layout components, and modular blocks.
- Ensure components are reusable and self-contained.
- Maintain a clear separation between public pages and dashboard UI elements.

### **Pages**

- Public pages and dashboard pages must be separated clearly.
- Each page should import only what it needs.

### **Types**

- Define all domain-related types inside a dedicated `types` folder.
- Types must represent the exact shape of all collections used within the app.

### **Services**

- Include modules for dummy-data generation, static-data access, and helper utilities.
- Keep service logic pure and separated from UI.

### **Utilities**

- Store general-purpose helpers such as formatters and validators.

### **Assets**

- Organize images, icons, and media files in dedicated folders.

---

## 3. Collections — Definitions

The app is driven by strongly typed collections. These types describe all data entities used across public and dashboard sections.

### **Collections to Define**

- Service
- BlogPost (articles + case studies)
- TeamMember
- ContactSubmission
- Project
- Task
- FAQ
- SiteSettings

Each collection must include:

- Unique IDs
- Required descriptive fields
- Optional metadata (SEO, timestamps, tags, etc.)
- Any necessary relationships (e.g., project → tasks, blog → author, task → assigned member)
  follow: collections_types.md

---

## 4. Dummy Data — Instructions

Dummy data must follow the exact structure of the defined collections.
follow: collections_types.md

### **How to Create Dummy Data**

1. follow: collections_types.md types first.
2. For each collection, create arrays with at least several records.
3. Use consistent IDs across related collections — example:
   - A blog post must reference a valid `TeamMember` as its author.
   - A project must reference valid `Task` IDs.
4. For rich text fields, store HTML strings.
5. Ensure collections resemble realistic, structured data.

### **Dummy Data Requirements**

- Must be self-contained.
- Must not rely on external APIs.
- Must reflect expected app behavior (published/unpublished, progress values, status states).
- Should be extendable for testing additional UI features.

---

## 5. Dashboard Instructions

All CRUD operations in the dashboard must:

- Use modals/popup interfaces for create/update.
- Validate all fields before saving.
- Write updates to in-memory or static local data structures.
- Reflect changes immediately in UI.

### **Dashboard Management Areas**

- **Contacts**: track submissions and update statuses.
- **Projects**: track progress, members, and tasks.
- **Tasks**: include drag-and-drop ordering and rich text editing.
- **Members**: manage team members.
- **Blog**: manage articles and case studies, including rich text content.

---

## 6. UI Requirements

- Stunning, modern interface.
- Fully responsive design.
- Clean and maintainable components.
- Consistent spacing, typography, and visual hierarchy.
- Use reusable UI blocks for cards, forms, lists, and tables.

---

## 7. Development Guidelines

- Ensure code readability and maintainability.
- Use reusable patterns for forms and modals.
- Use clear naming conventions.
- Keep logic and presentation layers separate.
- Avoid duplication by abstracting shared logic.

---

## 8. Dummy Data Integration

- Load dummy data at app initialization.
- Use dummy data as the source for all lists and detail views.
- Ensure UI updates correctly when modifying the dummy records.
- Maintain a structured, predictable pattern so data can expand easily.

---

## 9. Notes

- This project is **frontend-only**.
- No external backend or database is required.
- Dummy data must fully simulate real content and relationships.

---

## 10. Next Steps

If you need:

- Full type definitions file
- Complete dummy-data generation script
- Boilerplate components
- Pre-filled service/blog/task/project datasets

Ask for the specific file and it will be generated.

---

**End of README**
