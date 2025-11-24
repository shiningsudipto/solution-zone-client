# Digital Agency Frontend

A complete digital agency platform with public pages and admin dashboard. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎨 Brand Colors

- **Primary**: `#a44efd` (Purple)
- **Secondary**: `#fd920a` (Orange)
- **Accent**: `#a1d69c` (Green)
- **Background**: `#fdfbf9` and `#fff`
- **Text**: `#0f0f0f` (with white text on primary/secondary colors)

## 📁 Project Structure

```
solution-zone/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with brand colors
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
│
├── components/            # React components
│   └── ui/               # UI components (shadcn/ui)
│
├── data/                  # Dummy data collections
│   ├── blog.ts           # Blog posts and case studies
│   ├── contacts.ts       # Contact form submissions
│   ├── faqs.ts           # FAQ items
│   ├── projects.ts       # Client projects
│   ├── services.ts       # Agency services
│   ├── site-settings.ts  # Site configuration
│   ├── tasks.ts          # Project tasks
│   ├── team.ts           # Team members
│   ├── index.ts          # Central exports
│   └── README.md         # Data documentation
│
├── lib/                   # Utilities and helpers
│   ├── constants.ts      # App constants and config
│   ├── data-helpers.ts   # Data access utilities
│   └── utils.ts          # General utilities
│
├── types/                 # TypeScript type definitions
│   └── index.ts          # All collection types
│
└── public/               # Static assets
```

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📋 Features

### Public Pages

- Homepage with hero, services, case studies, and testimonials
- About page with team and company information
- Services overview and individual service pages
- Blog with articles and case studies
- FAQ page with searchable/filterable questions
- Contact page with form
- Privacy Policy and Terms & Conditions

### Dashboard (Admin)

- Project management with status tracking
- Task management with drag-and-drop
- Team member management
- Contact form submission tracking
- Blog post creation and management
- All CRUD operations via modals/popups

## 🗂️ Data Collections

All data is strongly typed and located in `/data`:

- **Services** - Agency service offerings (UI/UX, Web Dev, App Dev, Marketing, Consultation)
- **Blog Posts** - Articles and case studies with full content
- **Team Members** - Team profiles with roles and social links
- **Projects** - Client projects with status, progress, and team assignments
- **Tasks** - Project tasks with priorities and statuses
- **Contact Submissions** - Form submissions with workflow statuses
- **FAQs** - Organized by topics
- **Site Settings** - Global configuration

See `/data/README.md` for detailed documentation.

## 🎯 Type Definitions

All TypeScript types are defined in `/types/index.ts`:

- `Service` - Service offerings
- `BlogPost` - Blog articles and case studies
- `TeamMember` - Team member profiles
- `Project` - Client projects
- `Task` - Project tasks
- `ContactSubmission` - Contact form submissions
- `FAQ` - Frequently asked questions
- `SiteSettings` - Site configuration

## 🛠️ Utilities

### Data Helpers (`/lib/data-helpers.ts`)

Helper functions for accessing and filtering data:

- `getTeamMemberById()` - Get team member by ID
- `getBlogPostBySlug()` - Get blog post by slug
- `getPublishedBlogPosts()` - Get all published posts
- `getTasksByProject()` - Get tasks for a project
- And many more...

### Constants (`/lib/constants.ts`)

Reusable constants throughout the app:

- Brand colors
- Site information
- Navigation links
- Status options
- Testimonials
- Company stats

## 🎨 Styling

The project uses:

- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theming (defined in `app/globals.css`)
- **shadcn/ui** for pre-built accessible components
- **Dark mode** support with brand color adjustments

## 📝 Development Guidelines

1. **Components** - Create reusable, self-contained components
2. **Types** - Always use TypeScript types from `/types`
3. **Data** - Import from `/data` for all content
4. **Constants** - Use `/lib/constants.ts` for static values
5. **Helpers** - Use `/lib/data-helpers.ts` for data operations
6. **Styling** - Use Tailwind classes and CSS variables
7. **Modals** - Use popups for all create/update operations in dashboard

## 🔗 Key Relationships

- Blog posts reference authors (team members)
- Projects reference team members and tasks
- Tasks reference projects and assignees (team members)
- Contact submissions can be assigned to team members

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/docs)

## 📄 License

This is a frontend-only demonstration project. No external backend or database required.
