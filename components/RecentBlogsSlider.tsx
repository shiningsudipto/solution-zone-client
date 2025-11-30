"use client";

import { useState, useEffect } from "react";
import { blogPosts } from "@/data/blog";
import { teamMembers } from "@/data/team";
import Link from "next/link";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const typeColors = {
  article: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "case-study": "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

const typeLabels = {
  article: "Article",
  "case-study": "Case Study",
};

export default function RecentBlogsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get only published posts, sorted by date
  const publishedPosts = blogPosts
    .filter((post) => post.isPublished)
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    )
    .slice(0, 6); // Get 6 most recent

  const getAuthorName = (authorId: string) => {
    const author = teamMembers.find((m) => m.id === authorId);
    return author?.name || "Unknown";
  };

  const getAuthorAvatar = (authorId: string) => {
    const author = teamMembers.find((m) => m.id === authorId);
    return author?.avatar || "";
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === publishedPosts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? publishedPosts.length - 1 : prev - 1
    );
  };

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  if (publishedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest articles, case studies, and industry
            insights
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Main Slider Content */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {publishedPosts.map((post) => (
                <div key={post.id} className="min-w-full">
                  <div className="grid md:grid-cols-2 gap-8 items-center bg-card border border-border rounded-2xl overflow-hidden">
                    {/* Image */}
                    <div className="relative h-[400px] bg-gradient-to-br from-primary/20 to-secondary/20">
                      {post.coverImage || post.featuredImage ? (
                        <img
                          src={post.coverImage || post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-6xl font-bold text-primary/20">
                            {post.title.charAt(0)}
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            typeColors[post.type]
                          }`}
                        >
                          {typeLabels[post.type]}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={getAuthorAvatar(post.authorId)}
                            alt={getAuthorName(post.authorId)}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{getAuthorName(post.authorId)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(
                              post.publishedAt || post.createdAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        {post.readingTime && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-3xl font-bold text-foreground mb-4 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                      >
                        Read Article
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur border border-border rounded-full hover:bg-background transition-all shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur border border-border rounded-full hover:bg-background transition-all shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {publishedPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-semibold"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
