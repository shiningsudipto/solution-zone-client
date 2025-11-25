import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
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
  );
}
