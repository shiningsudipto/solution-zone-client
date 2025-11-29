"use client";

import { CustomModal } from "@/components/CustomModal";
import {
  FileText,
  User,
  Calendar,
  Tag,
  Clock,
  Image as ImageIcon,
  TrendingUp,
} from "lucide-react";
import type { BlogPost } from "@/types";

const typeColors = {
  article: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "case-study": "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const typeLabels = {
  article: "Article",
  "case-study": "Case Study",
};

interface ViewBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
  getAuthorName: (id: string) => string;
}

export function ViewBlogModal({
  isOpen,
  onClose,
  post,
  getAuthorName,
}: ViewBlogModalProps) {
  if (!post) return null;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Blog Post Details" size="xl">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <div className="text-sm text-muted-foreground mb-1">Title</div>
          <div className="text-2xl font-bold">{post.title}</div>
        </div>

        {/* Type and Status */}
        <div className="flex gap-3">
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

        {/* Excerpt */}
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <FileText className="w-4 h-4" />
            Excerpt
          </div>
          <div className="text-base bg-muted/30 p-4 rounded-lg">
            {post.excerpt}
          </div>
        </div>

        {/* Content Preview */}
        <div>
          <div className="text-sm text-muted-foreground mb-1">Content</div>
          <div
            className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg max-h-96 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <User className="w-4 h-4" />
              Author
            </div>
            <div className="font-medium">{getAuthorName(post.authorId)}</div>
          </div>
          {post.readingTime && (
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                Reading Time
              </div>
              <div className="font-medium">{post.readingTime} min</div>
            </div>
          )}
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <ImageIcon className="w-4 h-4" />
              Cover Image
            </div>
            <div className="text-sm font-mono bg-muted/30 p-2 rounded">
              {post.coverImage}
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Tag className="w-4 h-4" />
              Tags
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Metrics */}
        {post.type === "case-study" && post.caseStudy && (
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <TrendingUp className="w-4 h-4" />
              Case Study Metrics
            </div>
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <div className="font-medium">Client: {post.caseStudy.client}</div>
              <div className="grid grid-cols-2 gap-3">
                {post.caseStudy.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 bg-background rounded-lg">
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              Created
            </div>
            <div className="font-medium">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
          {post.publishedAt && (
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                Published
              </div>
              <div className="font-medium">
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
}
