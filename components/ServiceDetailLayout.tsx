import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { PROCESS_STEPS } from "@/lib/constants";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Palette,
  Smartphone,
  TrendingUp,
  Search,
  Zap,
  Users,
  Shield,
  Globe,
  Lightbulb,
} from "lucide-react";
import { FAQSection } from "@/components/ui/FAQSection";
import type { Service } from "@/types";

// Tools & Technologies by service
const toolsMap: Record<string, { name: string; icon: any }[]> = {
  "ui-ux-design": [
    { name: "Figma", icon: Palette },
    { name: "Adobe XD", icon: Palette },
    { name: "Sketch", icon: Palette },
    { name: "InVision", icon: Lightbulb },
    { name: "Principle", icon: Zap },
    { name: "Maze", icon: Users },
  ],
  "web-development": [
    { name: "React", icon: Code },
    { name: "Next.js", icon: Code },
    { name: "TypeScript", icon: Code },
    { name: "Node.js", icon: Globe },
    { name: "Tailwind CSS", icon: Palette },
    { name: "PostgreSQL", icon: Shield },
  ],
  "app-development": [
    { name: "React Native", icon: Smartphone },
    { name: "Flutter", icon: Smartphone },
    { name: "Swift", icon: Code },
    { name: "Kotlin", icon: Code },
    { name: "Firebase", icon: Zap },
    { name: "App Store", icon: Globe },
  ],
  "digital-marketing": [
    { name: "Google Analytics", icon: TrendingUp },
    { name: "Google Ads", icon: Search },
    { name: "Facebook Ads", icon: Users },
    { name: "SEMrush", icon: Search },
    { name: "Mailchimp", icon: Zap },
    { name: "HubSpot", icon: TrendingUp },
  ],
  "business-consultation": [
    { name: "Strategic Planning", icon: Lightbulb },
    { name: "Data Analysis", icon: TrendingUp },
    { name: "Process Mapping", icon: Zap },
    { name: "Market Research", icon: Search },
    { name: "ROI Tracking", icon: Shield },
    { name: "Change Management", icon: Users },
  ],
};

interface ServiceDetailLayoutProps {
  service: Service;
}

export function ServiceDetailLayout({ service }: ServiceDetailLayoutProps) {
  // Get related case studies
  const relatedCaseStudies = blogPosts
    .filter((post) => post.type === "case-study" && post.isPublished)
    .slice(0, 2);

  // Map service to appropriate process
  const processKey = service.slug.includes("design")
    ? "design"
    : service.slug.includes("development") || service.slug.includes("app")
    ? "development"
    : service.slug.includes("marketing")
    ? "marketing"
    : "design";
  const processSteps = PROCESS_STEPS[processKey as keyof typeof PROCESS_STEPS];

  const tools = toolsMap[service.slug] || toolsMap["ui-ux-design"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground">{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                Service
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {service.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {service.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#process"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  See How It Works
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                    {service.title.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: service.longDescription }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-linear-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What's Included
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features delivered with every {service.title}{" "}
              project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                <span className="text-foreground font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven step-by-step approach to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all h-full">
                  <div className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Connector arrow */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 text-primary/30">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 bg-linear-to-br from-secondary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Key Benefits
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How our {service.title} services support your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.offerings.map((offering, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {offering.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {offering.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Tools & Technologies
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We use industry-leading tools to deliver the best results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/50 transition-all group"
                >
                  <Icon className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-foreground">
                    {tool.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-20 sm:py-32 bg-linear-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how we've helped other businesses succeed
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
                        {study.caseStudy.metrics
                          .slice(0, 2)
                          .map((metric, idx) => (
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
      )}

      {/* FAQ Section */}
      <FAQSection limit={6} />

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-linear-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Your {service.title} Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your needs and create a custom solution that drives
            results for your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition-all shadow-xl"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
