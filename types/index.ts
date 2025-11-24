// Core ID Type
export type ID = string;

// SEO Metadata
export interface Seo {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

// Service Collection
export interface Service {
  id: ID;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  heroImage?: string;
  features: string[];
  offerings: { title: string; description: string }[];
  order: number;
  createdAt: string;
  updatedAt?: string;
  seo?: Seo;
}

// Blog Post Collection
export interface BlogPost {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: ID;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  coverImage?: string;
  readingTime?: number;
  meta?: Seo;
  createdAt: string;
  updatedAt?: string;
  type: "article" | "case-study";
  caseStudy?: {
    client: string;
    metrics: { label: string; value: string }[];
  } | null;
}

// Team Member Collection
export interface TeamMember {
  id: ID;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  email?: string;
  socials?: { provider: string; url: string }[];
  joinedAt?: string;
}

// Contact Submission Collection
export interface ContactSubmission {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  status: "new" | "in-review" | "contacted" | "closed";
  createdAt: string;
  assignedTo?: ID;
  notes?: string;
}

// Project Collection
export interface Project {
  id: ID;
  name: string;
  client: string;
  description?: string;
  status: "proposal" | "active" | "on-hold" | "completed" | "archived";
  progress: number;
  startDate?: string;
  endDate?: string;
  members: ID[];
  tasks: ID[];
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

// Task Collection
export interface Task {
  id: ID;
  title: string;
  description?: string;
  projectId?: ID | null;
  assignedTo?: ID | null;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string | null;
  comments?: { id: ID; authorId: ID; content: string; createdAt: string }[];
  createdAt: string;
  updatedAt?: string;
  order?: number;
}

// FAQ Collection
export interface FAQ {
  id: ID;
  question: string;
  answer: string;
  topic?: string;
  order?: number;
}

// Site Settings Collection
export interface SiteSettings {
  id: ID;
  siteName: string;
  email: string;
  phone?: string;
  address?: string;
  logo?: string;
  socialLinks?: { provider: string; url: string }[];
  legal?: { privacyUrl?: string; termsUrl?: string };
}
