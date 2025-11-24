"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { teamMembers } from "@/data/team";
import { getAllBlogTags } from "@/lib/data-helpers";
import {
  Search,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  Sparkles,
  BookOpen,
  Briefcase,
} from "lucide-react";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<
    "all" | "article" | "case-study"
  >("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [itemsToShow, setItemsToShow] = useState(6);

  // Get all published posts
  const publishedPosts = blogPosts.filter((post) => post.isPublished);

  // Get all unique tags
  const allTags = getAllBlogTags();

  // Filter posts based on search, type, and tag
  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Type filter
      const matchesType = selectedType === "all" || post.type === selectedType;

      // Tag filter
      const matchesTag =
        selectedTag === "all" || post.tags.includes(selectedTag);

      return matchesSearch && matchesType && matchesTag;
    });
  }, [publishedPosts, searchQuery, selectedType, selectedTag]);

  // Paginated posts
  const visiblePosts = filteredPosts.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredPosts.length;

  // Get author info
  const getAuthor = (authorId: string) => {
    return teamMembers.find((member) => member.id === authorId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Insights & Stories
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Blog &
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary mt-2">
                Case Studies
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our latest articles, insights, and success stories from
              the world of digital innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-y border-border sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles, case studies, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <button
              onClick={() => setSelectedType("all")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setSelectedType("article")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === "article"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Articles
            </button>
            <button
              onClick={() => setSelectedType("case-study")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                selectedType === "case-study"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Case Studies
            </button>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedTag("all")}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedTag === "all"
                  ? "bg-secondary text-white"
                  : "bg-accent/20 text-accent-foreground hover:bg-accent/30"
              }`}
            >
              <Tag className="w-3 h-3" />
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? "bg-secondary text-white"
                    : "bg-accent/20 text-accent-foreground hover:bg-accent/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing {visiblePosts.length} of {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No posts found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setSelectedTag("all");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePosts.map((post) => {
                  const author = getAuthor(post.authorId);

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300"
                    >
                      {/* Post Image/Visual */}
                      <div
                        className={`relative h-48 overflow-hidden ${
                          post.type === "case-study"
                            ? "bg-linear-to-br from-secondary/20 to-primary/20"
                            : "bg-linear-to-br from-primary/20 to-accent/20"
                        }`}
                      >
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>

                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                              post.type === "case-study"
                                ? "bg-secondary text-white"
                                : "bg-primary text-white"
                            }`}
                          >
                            {post.type === "case-study" ? (
                              <>
                                <Briefcase className="w-3 h-3" />
                                Case Study
                              </>
                            ) : (
                              <>
                                <BookOpen className="w-3 h-3" />
                                Article
                              </>
                            )}
                          </span>
                        </div>

                        {/* Reading Time */}
                        {post.readingTime && (
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                              <Clock className="w-3 h-3" />
                              {post.readingTime} min
                            </span>
                          </div>
                        )}

                        {/* Case Study Client */}
                        {post.caseStudy && (
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="text-white font-semibold">
                              {post.caseStudy.client}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Post Content */}
                      <div className="p-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-accent/10 text-accent-foreground rounded text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t border-border">
                          {author && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{author.name}</span>
                            </div>
                          )}
                          {post.publishedAt && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                          )}
                        </div>

                        {/* Case Study Metrics Preview */}
                        {post.caseStudy && (
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {post.caseStudy.metrics
                              .slice(0, 2)
                              .map((metric, idx) => (
                                <div
                                  key={idx}
                                  className="text-center p-2 bg-accent/10 rounded-lg"
                                >
                                  <div className="text-lg font-bold text-primary">
                                    {metric.value}
                                  </div>
                                  <div className="text-xs text-muted-foreground line-clamp-1">
                                    {metric.label}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}

                        {/* Read More Link */}
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                          Read{" "}
                          {post.type === "case-study"
                            ? "Case Study"
                            : "Article"}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setItemsToShow((prev) => prev + 6)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                  >
                    Load More Posts
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-sm text-muted-foreground mt-4">
                    {filteredPosts.length - itemsToShow} more{" "}
                    {filteredPosts.length - itemsToShow === 1
                      ? "post"
                      : "posts"}{" "}
                    available
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Subscribe to our newsletter for the latest insights, tips, and case
            studies delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition-all shadow-xl whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
