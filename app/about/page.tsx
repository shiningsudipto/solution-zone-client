import Link from "next/link";
import { teamMembers } from "@/data/team";
import { COMPANY_STATS, SITE_INFO } from "@/lib/constants";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Shield,
  Zap,
  Users,
  Award,
  Globe,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Client-Centered",
      description:
        "Your success is our priority. We build lasting partnerships based on trust and transparency.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We stay ahead of industry trends and embrace cutting-edge technologies to deliver exceptional results.",
    },
    {
      icon: Shield,
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in every project, ensuring robust, scalable, and maintainable solutions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We work closely with our clients, fostering open communication and shared ownership of success.",
    },
    {
      icon: Zap,
      title: "Agility",
      description:
        "We adapt quickly to changing needs and deliver results efficiently without compromising quality.",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "We bring international best practices and diverse perspectives to every project we undertake.",
    },
  ];

  const differentiators = [
    {
      title: "Proven Track Record",
      description:
        "Over 500 successfully delivered projects across various industries and technologies.",
      highlight: "500+ Projects",
    },
    {
      title: "Expert Team",
      description:
        "Our diverse team brings deep expertise in design, development, marketing, and strategy.",
      highlight: "50+ Experts",
    },
    {
      title: "Client Satisfaction",
      description:
        "We maintain a 98% client satisfaction rate with long-term partnerships.",
      highlight: "98% Satisfaction",
    },
    {
      title: "End-to-End Service",
      description:
        "From strategy to deployment and beyond, we handle every aspect of your digital journey.",
      highlight: "Full Service",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Award className="w-4 h-4" />
              About Solution Zone
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Building Digital Excellence
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary mt-2">
                Since 2012
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {SITE_INFO.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COMPANY_STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2012, Solution Zone began with a simple yet
                  powerful vision: to help businesses thrive in the digital age.
                  What started as a small team of passionate designers and
                  developers has grown into a full-service digital agency
                  serving clients worldwide.
                </p>
                <p>
                  We've built our reputation on delivering exceptional results,
                  maintaining long-term client relationships, and staying at the
                  forefront of digital innovation. Our multidisciplinary
                  approach combines strategic thinking, creative excellence, and
                  technical expertise to solve complex challenges.
                </p>
                <p>
                  Today, we're proud to have helped over 200 clients across
                  various industries achieve their digital goals, from startups
                  finding their footing to established enterprises undergoing
                  digital transformation.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 relative">
                <div className="bg-card rounded-xl p-8 shadow-xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Our Mission
                      </h3>
                      <p className="text-muted-foreground">
                        To empower businesses with innovative digital solutions
                        that drive growth, enhance user experiences, and create
                        lasting value.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Eye className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Our Vision
                      </h3>
                      <p className="text-muted-foreground">
                        To be the trusted digital partner for businesses
                        worldwide, recognized for excellence, innovation, and
                        transformative impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-32 bg-linear-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all group"
              >
                <div className="aspect-square bg-linear-to-br from-primary/20 to-secondary/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {member.socials && member.socials.length > 0 && (
                    <div className="flex gap-3">
                      {member.socials.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-muted hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all text-xs font-semibold"
                        >
                          {social.provider.substring(0, 2).toUpperCase()}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 sm:py-32 bg-linear-to-br from-secondary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Solution Zone?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What sets us apart from the competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-br from-primary to-secondary shrink-0">
                    {diff.highlight}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              We don't just deliver projects—we build partnerships. Our
              commitment to quality, transparency, and continuous improvement
              ensures your digital initiatives succeed.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-linear-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how Solution Zone can help you achieve your digital
            goals and transform your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition-all shadow-xl"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
