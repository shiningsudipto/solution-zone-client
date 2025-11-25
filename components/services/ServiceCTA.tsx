import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCTAProps {
  serviceTitle: string;
}

export function ServiceCTA({ serviceTitle }: ServiceCTAProps) {
  return (
    <section className="py-20 sm:py-32 bg-linear-to-r from-primary to-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Start Your {serviceTitle} Project?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss your needs and create a custom solution that drives
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
  );
}
