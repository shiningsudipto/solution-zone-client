import { CheckCircle } from "lucide-react";
import type { Service } from "@/types";

interface ServiceFeaturesProps {
  service: Service;
}

export function ServiceFeatures({ service }: ServiceFeaturesProps) {
  return (
    <section className="py-20 sm:py-32 bg-linear-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What&apos;s Included
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive features delivered with every {service.title} project
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
  );
}
