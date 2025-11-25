import Link from "next/link";
import { services } from "@/data/services";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { FAQSection } from "@/components/ui/FAQSection";

export default function ServicesPage() {
  // Group services by category for better organization
  const allServices = services.sort((a, b) => a.order - b.order);

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
              Our Services
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Comprehensive
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary mt-2">
                Digital Solutions
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              From strategy to execution, we provide end-to-end digital services
              that drive real business results and help you stay ahead of the
              competition.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                {/* Service Icon/Visual */}
                <div className="relative h-48 bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:scale-110 transition-transform">
                      {service.title.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  {/* Order badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Key Features Preview */}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <p className="text-xs text-muted-foreground pl-6">
                          +{service.features.length - 3} more features
                        </p>
                      )}
                    </div>
                  )}

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all mt-6">
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 sm:py-32 bg-linear-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Makes Our Services Different?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We go beyond standard deliverables to ensure your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Strategic Approach",
                description:
                  "Every project starts with understanding your business goals and target audience.",
                icon: "🎯",
              },
              {
                title: "Expert Team",
                description:
                  "Work with experienced professionals who are leaders in their respective fields.",
                icon: "👥",
              },
              {
                title: "Proven Process",
                description:
                  "Our refined methodology ensures consistent quality and timely delivery.",
                icon: "⚙️",
              },
              {
                title: "Ongoing Support",
                description:
                  "We don't disappear after launch. We're here to help you succeed long-term.",
                icon: "🤝",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-primary/50 transition-all"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We start by understanding your needs, goals, and challenges through in-depth consultation.",
              },
              {
                step: "02",
                title: "Strategy",
                description:
                  "We develop a comprehensive strategy tailored to your specific requirements and objectives.",
              },
              {
                step: "03",
                title: "Execution",
                description:
                  "Our expert team brings the strategy to life with precision and attention to detail.",
              },
              {
                step: "04",
                title: "Optimization",
                description:
                  "We continuously monitor, measure, and optimize for maximum impact and ROI.",
              },
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-br from-primary to-secondary mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {process.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
                {/* Connector line (hidden on last item) */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 sm:py-32 bg-linear-to-br from-secondary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We have experience across a wide range of industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "E-commerce",
              "Healthcare",
              "Finance",
              "Education",
              "Real Estate",
              "Technology",
              "Manufacturing",
              "Non-Profit",
              "Entertainment",
              "Food & Beverage",
              "Travel & Tourism",
              "Professional Services",
            ].map((industry, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl px-4 py-3 text-center hover:border-primary hover:shadow-lg transition-all cursor-default"
              >
                <span className="text-foreground font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection limit={6} />

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-linear-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss which services are right for your business and how we
            can help you achieve your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition-all shadow-xl"
            >
              Request a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
