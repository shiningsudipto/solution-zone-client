# Data Collections

This directory contains all dummy data used throughout the Digital Agency application.

## Files Overview

- **`team.ts`** - Team member profiles with roles, bios, and social links
- **`services.ts`** - Agency service offerings (UI/UX, Web Dev, App Dev, Marketing, Consultation)
- **`blog.ts`** - Blog posts including both articles and case studies
- **`projects.ts`** - Client projects with status, progress, and team assignments
- **`tasks.ts`** - Tasks associated with projects, with various statuses and priorities
- **`contacts.ts`** - Contact form submissions with different statuses
- **`faqs.ts`** - Frequently asked questions organized by topic
- **`site-settings.ts`** - Global site configuration and settings
- **`index.ts`** - Central export file for all data collections

## Usage

Import data collections as needed:

```typescript
import { teamMembers, services, blogPosts } from "@/data";
```

Or import specific collections:

```typescript
import { teamMembers } from "@/data/team";
import { services } from "@/data/services";
```

## Data Relationships

- **Blog Posts** reference **Team Members** via `authorId`
- **Projects** reference **Team Members** via `members` array
- **Projects** reference **Tasks** via `tasks` array
- **Tasks** reference **Projects** via `projectId`
- **Tasks** reference **Team Members** via `assignedTo`
- **Contact Submissions** reference **Team Members** via `assignedTo`

## Data Structure

All collections follow TypeScript types defined in `/types/index.ts`. Each collection includes:

- Unique IDs
- Required descriptive fields
- Optional metadata (SEO, timestamps, tags)
- Relationships to other collections where applicable

## Extending Data

To add new data:

1. Import the appropriate type from `/types`
2. Create new records following the existing pattern
3. Ensure all referenced IDs exist in related collections
4. Maintain consistent data quality and realistic content
