"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { RichTextEditor } from "@/components/RichTextEditor";
import { teamMembers } from "@/data/team";
import { blogPosts as initialPosts } from "@/data/blog";
import type { BlogPost } from "@/types";
import { ArrowLeft, X, Save } from "lucide-react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    authorId: "",
    tags: [],
    isPublished: false,
    type: "article",
    caseStudy: null,
  });

  useEffect(() => {
    const id = params.id as string;
    const foundPost = initialPosts.find((p) => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      setShowCaseStudy(foundPost.type === "case-study");
    } else {
      router.push("/dashboard/blog");
    }
  }, [params.id, router]);

  const isValid =
    post.title && post.slug && post.excerpt && post.content && post.authorId;

  const handleTypeChange = (type: "article" | "case-study") => {
    setShowCaseStudy(type === "case-study");
    setPost({
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
      setPost({
        ...post,
        caseStudy: {
          ...post.caseStudy,
          metrics: [...(post.caseStudy.metrics || []), { label: "", value: "" }],
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
      const newMetrics = [...(post.caseStudy.metrics || [])];
      newMetrics[index][field] = value;
      setPost({
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
      setPost({
        ...post,
        caseStudy: {
          ...post.caseStudy,
          metrics: (post.caseStudy.metrics || []).filter((_, i) => i !== index),
        },
      });
    }
  };

  const handleSave = () => {
    if (isValid) {
      // In a real app, this would update the backend
      console.log("Updating post:", post);
      router.push(`/dashboard/blog/${post.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Edit Blog Post
            </h1>
            <p className="text-muted-foreground">
              Update your article or case study
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={post.title || ""}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Blog post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={post.slug || ""}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="post-url-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <textarea
              value={post.excerpt || ""}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Brief description of the post..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              content={post.content || ""}
              onChange={(content) => setPost({ ...post, content })}
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
                Author <span className="text-red-500">*</span>
              </label>
              <select
                value={post.authorId || ""}
                onChange={(e) => setPost({ ...post, authorId: e.target.value })}
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
                  setPost({
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
                  setPost({ ...post, coverImage: e.target.value })
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
                  setPost({
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
                  setPost({ ...post, isPublished: e.target.checked })
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
                    setPost({ ...post, publishedAt: e.target.value })
                  }
                  className="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}
          </div>

          {/* Case Study Fields */}
          {showCaseStudy && post.caseStudy && (
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Case Study Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={post.caseStudy.client || ""}
                    onChange={(e) =>
                      setPost({
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={post.caseStudy.industry || ""}
                    onChange={(e) =>
                      setPost({
                        ...post,
                        caseStudy: {
                          ...post.caseStudy!,
                          industry: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Technology, Finance, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Challenge
                </label>
                <textarea
                  value={post.caseStudy.challenge || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      caseStudy: {
                        ...post.caseStudy!,
                        challenge: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="What was the problem?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Solution
                </label>
                <textarea
                  value={post.caseStudy.solution || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      caseStudy: {
                        ...post.caseStudy!,
                        solution: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="How did you solve it?"
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
                  {(post.caseStudy.metrics || []).map((metric, index) => (
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
      </div>
    </div>
  );
}
