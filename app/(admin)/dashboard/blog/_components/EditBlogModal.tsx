"use client";

import { CustomModal } from "@/components/CustomModal";
import { RichTextEditor } from "@/components/RichTextEditor";
import { teamMembers } from "@/data/team";
import type { BlogPost } from "@/types";
import { X } from "lucide-react";
import { useState } from "react";

interface EditBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Partial<BlogPost>;
  onPostChange: (post: Partial<BlogPost>) => void;
  onSave: () => void;
}

export function EditBlogModal({
  isOpen,
  onClose,
  post,
  onPostChange,
  onSave,
}: EditBlogModalProps) {
  const [showCaseStudy, setShowCaseStudy] = useState(post.type === "case-study");

  const handleTypeChange = (type: "article" | "case-study") => {
    setShowCaseStudy(type === "case-study");
    onPostChange({
      ...post,
      type,
      caseStudy:
        type === "case-study"
          ? post.caseStudy || {
              client: "",
              metrics: [{ label: "", value: "" }],
            }
          : null,
    });
  };

  const addMetric = () => {
    if (post.caseStudy) {
      onPostChange({
        ...post,
        caseStudy: {
          ...post.caseStudy,
          metrics: [...post.caseStudy.metrics, { label: "", value: "" }],
        },
      });
    }
  };

  const updateMetric = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    if (post.caseStudy) {
      const newMetrics = [...post.caseStudy.metrics];
      newMetrics[index][field] = value;
      onPostChange({
        ...post,
        caseStudy: {
          ...post.caseStudy,
          metrics: newMetrics,
        },
      });
    }
  };

  const removeMetric = (index: number) => {
    if (post.caseStudy) {
      onPostChange({
        ...post,
        caseStudy: {
          ...post.caseStudy,
          metrics: post.caseStudy.metrics.filter((_, i) => i !== index),
        },
      });
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Blog Post"
      size="full"
      footer={
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Save Changes
          </button>
        </div>
      }
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              type="text"
              value={post.title || ""}
              onChange={(e) => onPostChange({ ...post, title: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Blog post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Slug
            </label>
            <input
              type="text"
              value={post.slug || ""}
              onChange={(e) => onPostChange({ ...post, slug: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="post-url-slug"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Excerpt
          </label>
          <textarea
            value={post.excerpt || ""}
            onChange={(e) => onPostChange({ ...post, excerpt: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Brief description of the post..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Content
          </label>
          <RichTextEditor
            content={post.content || ""}
            onChange={(content) => onPostChange({ ...post, content })}
            placeholder="Write your blog post content..."
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Type
            </label>
            <select
              value={post.type}
              onChange={(e) =>
                handleTypeChange(e.target.value as "article" | "case-study")
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="article">Article</option>
              <option value="case-study">Case Study</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Author
            </label>
            <select
              value={post.authorId || ""}
              onChange={(e) =>
                onPostChange({ ...post, authorId: e.target.value })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select author</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Reading Time (min)
            </label>
            <input
              type="number"
              value={post.readingTime || ""}
              onChange={(e) =>
                onPostChange({
                  ...post,
                  readingTime: parseInt(e.target.value) || undefined,
                })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              value={post.coverImage || ""}
              onChange={(e) =>
                onPostChange({ ...post, coverImage: e.target.value })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={post.tags?.join(", ") || ""}
              onChange={(e) =>
                onPostChange({
                  ...post,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="design, web, technology"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={post.isPublished || false}
              onChange={(e) =>
                onPostChange({ ...post, isPublished: e.target.checked })
              }
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm font-medium text-foreground">
              Published
            </span>
          </label>

          {post.isPublished && (
            <div>
              <input
                type="date"
                value={post.publishedAt || ""}
                onChange={(e) =>
                  onPostChange({ ...post, publishedAt: e.target.value })
                }
                className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Case Study Fields */}
        {showCaseStudy && post.caseStudy && (
          <div className="border-t border-border pt-4 space-y-4">
            <h3 className="text-lg font-semibold">Case Study Details</h3>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={post.caseStudy.client || ""}
                onChange={(e) =>
                  onPostChange({
                    ...post,
                    caseStudy: {
                      ...post.caseStudy!,
                      client: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Client name"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Metrics
                </label>
                <button
                  type="button"
                  onClick={addMetric}
                  className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:opacity-90"
                >
                  Add Metric
                </button>
              </div>
              <div className="space-y-2">
                {post.caseStudy.metrics.map((metric, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) =>
                        updateMetric(index, "label", e.target.value)
                      }
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Metric label"
                    />
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) =>
                        updateMetric(index, "value", e.target.value)
                      }
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Value"
                    />
                    <button
                      type="button"
                      onClick={() => removeMetric(index)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
}
