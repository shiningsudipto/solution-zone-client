import type { ID, TeamMember, BlogPost, Project, Task, Service } from "@/types";
import { teamMembers } from "@/data/team";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { tasks } from "@/data/tasks";
import { services } from "@/data/services";

/**
 * Get a team member by ID
 */
export function getTeamMemberById(id: ID): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}

/**
 * Get a blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get published blog posts only
 */
export function getPublishedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.isPublished);
}

/**
 * Get blog posts by type (article or case-study)
 */
export function getBlogPostsByType(type: "article" | "case-study"): BlogPost[] {
  return blogPosts.filter((post) => post.type === type && post.isPublished);
}

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * Get project by ID
 */
export function getProjectById(id: ID): Project | undefined {
  return projects.find((project) => project.id === id);
}

/**
 * Get tasks for a specific project
 */
export function getTasksByProject(projectId: ID): Task[] {
  return tasks.filter((task) => task.projectId === projectId);
}

/**
 * Get tasks assigned to a specific team member
 */
export function getTasksByAssignee(assigneeId: ID): Task[] {
  return tasks.filter((task) => task.assignedTo === assigneeId);
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(status: Project["status"]): Project[] {
  return projects.filter((project) => project.status === status);
}

/**
 * Get active projects (not archived or completed)
 */
export function getActiveProjects(): Project[] {
  return projects.filter(
    (project) => project.status !== "archived" && project.status !== "completed"
  );
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.tags.includes(tag) && post.isPublished
  );
}

/**
 * Get all unique blog tags
 */
export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get related blog posts (based on shared tags)
 */
export function getRelatedBlogPosts(post: BlogPost, limit = 3): BlogPost[] {
  return blogPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.isPublished &&
        p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, limit);
}

/**
 * Format date string to human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get reading time text
 */
export function getReadingTimeText(minutes?: number): string {
  if (!minutes) return "";
  return `${minutes} min read`;
}

/**
 * Get project progress percentage as formatted string
 */
export function getProgressText(progress: number): string {
  return `${progress}%`;
}

/**
 * Get status badge color class
 */
export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    "in-review": "bg-yellow-100 text-yellow-800",
    contacted: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    review: "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800",
    proposal: "bg-purple-100 text-purple-800",
    active: "bg-green-100 text-green-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    archived: "bg-gray-100 text-gray-800",
  };

  return colorMap[status] || "bg-gray-100 text-gray-800";
}

/**
 * Get priority badge color class
 */
export function getPriorityColor(priority: string): string {
  const colorMap: Record<string, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return colorMap[priority] || "bg-gray-100 text-gray-800";
}
