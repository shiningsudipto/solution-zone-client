"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { blogPosts as initialPosts } from "@/data/blog";
import { teamMembers } from "@/data/team";
import type { BlogPost } from "@/types";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  TrendingUp,
  BarChart3,
  Target,
  CheckCircle2,
  Edit,
} from "lucide-react";

const typeColors = {
  article: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "case-study": "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const typeLabels = {
  article: "Article",
  "case-study": "Case Study",
};

export default function ViewBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundPost = initialPosts.find((p) => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    } else {
      router.push("/dashboard/blog");
    }
  }, [params.id, router]);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const getAuthorName = (authorId: string) => {
    const author = teamMembers.find((m) => m.id === authorId);
    return author?.name || "Unknown";
  };

  const getAuthorAvatar = (authorId: string) => {
    const author = teamMembers.find((m) => m.id === authorId);
    return author?.avatar || "";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={() => router.push(`/dashboard/blog/${post.id}/edit`)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          <Edit className="w-5 h-5" />
          Edit Post
        </button>
      </div>

      {/* Post Content */}
      <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
        {/* Title and Badges */}
        <div className="space-y-4">
          <div className="flex gap-2">
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

          <h1 className="text-4xl font-bold text-foreground">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        </div>

        {/* Author and Meta */}
        <div className="flex items-center gap-6 py-4 border-y border-border">
          <div className="flex items-center gap-3">
            <img
              src={getAuthorAvatar(post.authorId)}
              alt={getAuthorName(post.authorId)}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-medium text-foreground">
                {getAuthorName(post.authorId)}
              </div>
              <div className="text-sm text-muted-foreground">Author</div>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
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
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="rounded-lg overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted rounded-lg text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Details */}
        {post.type === "case-study" && post.caseStudy && (
          <div className="pt-6 border-t border-border space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Case Study Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Client</h4>
                </div>
                <p className="text-muted-foreground">{post.caseStudy.client}</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Industry</h4>
                </div>
                <p className="text-muted-foreground">
                  {post.caseStudy.industry}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">Challenge</h4>
              </div>
              <p className="text-muted-foreground">{post.caseStudy.challenge}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">Solution</h4>
              </div>
              <p className="text-muted-foreground">{post.caseStudy.solution}</p>
            </div>

            {post.caseStudy.metrics && post.caseStudy.metrics.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Results</h4>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {post.caseStudy.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-muted rounded-lg border-l-4 border-primary"
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {post.caseStudy.testimonial && (
              <div className="p-6 bg-muted rounded-lg border-l-4 border-primary">
                <p className="text-lg italic text-foreground mb-3">
                  "{post.caseStudy.testimonial.quote}"
                </p>
                <div className="text-sm text-muted-foreground">
                  — {post.caseStudy.testimonial.author},{" "}
                  {post.caseStudy.testimonial.role}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEO Info */}
        {post.seo && (
          <div className="pt-6 border-t border-border space-y-3">
            <h3 className="font-semibold text-foreground">SEO Information</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">
                  Meta Title:{" "}
                </span>
                <span className="text-foreground">{post.seo.metaTitle}</span>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Meta Description:{" "}
                </span>
                <span className="text-foreground">
                  {post.seo.metaDescription}
                </span>
              </div>
              {post.seo.keywords && post.seo.keywords.length > 0 && (
                <div>
                  <span className="font-medium text-muted-foreground">
                    Keywords:{" "}
                  </span>
                  <span className="text-foreground">
                    {post.seo.keywords.join(", ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
