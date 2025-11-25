import Link from "next/link";
import { blogPosts } from "@/data/blog";

export function ServiceCaseStudies() {
  const relatedCaseStudies = blogPosts
    .filter((post) => post.type === "case-study" && post.isPublished)
    .slice(0, 2);

  if (relatedCaseStudies.length === 0) return null;

  return (
    <section className="py-20 sm:py-32 bg-linear-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how we&apos;ve helped other businesses succeed
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {relatedCaseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/blog/${study.slug}`}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/50 transition-all"
            >
              <div className="aspect-video bg-linear-to-br from-primary/20 to-secondary/20 relative">
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white font-semibold text-lg">
                    {study.caseStudy?.client}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {study.excerpt}
                </p>

                {study.caseStudy && (
                  <div className="grid grid-cols-2 gap-4">
                    {study.caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                      <div
                        key={idx}
                        className="text-center p-3 bg-accent/10 rounded-lg"
                      >
                        <div className="text-2xl font-bold text-primary">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
