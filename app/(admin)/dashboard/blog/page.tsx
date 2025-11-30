"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { blogPosts as initialPosts } from "@/data/blog";
import { teamMembers } from "@/data/team";
import type { BlogPost } from "@/types";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  User,
  Calendar,
  Tag,
  TrendingUp,
} from "lucide-react";

const typeColors = {
  article: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "case-study": "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const typeLabels = {
  article: "Article",
  "case-study": "Case Study",
};

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get author name by ID
  const getAuthorName = (authorId: string) => {
    const author = teamMembers.find((m) => m.id === authorId);
    return author?.name || "Unknown";
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      getAuthorName(post.authorId)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || post.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && post.isPublished) ||
      (statusFilter === "draft" && !post.isPublished);

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Stats
  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.isPublished).length,
    drafts: posts.filter((p) => !p.isPublished).length,
    articles: posts.filter((p) => p.type === "article").length,
    caseStudies: posts.filter((p) => p.type === "case-study").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage articles and case studies
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/blog/create")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
        >
          <Plus className="w-5 h-5" />
          Create Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {stats.total}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Total Posts
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {stats.published}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Published
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {stats.drafts}
          </div>
          <div className="text-sm font-medium text-muted-foreground">Drafts</div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {stats.articles}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Articles
          </div>
        </div>
        <div className="p-6 rounded-xl border-2 border-border bg-card">
          <div className="text-4xl font-bold text-foreground mb-2">
            {stats.caseStudies}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Case Studies
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="article">Articles</option>
          <option value="case-study">Case Studies</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
        <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="p-6">
              <div className="flex gap-6">
                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Title and Badges */}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            typeColors[post.type]
                          }`}
                        >
                          {typeLabels[post.type]}
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            post.isPublished
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                          }`}
                        >
                          {post.isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {getAuthorName(post.authorId)}
                    </div>
                    {post.readingTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min read
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    {post.type === "case-study" && post.caseStudy && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {post.caseStudy.client}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-muted rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 5 && (
                          <span className="px-2 py-1 text-xs text-muted-foreground">
                            +{post.tags.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => router.push(`/dashboard/blog/${post.id}`)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/70 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => router.push(`/dashboard/blog/${post.id}/edit`)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground bg-card border border-border rounded-2xl">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No blog posts found</p>
        </div>
      )}

    </div>
  );
}
