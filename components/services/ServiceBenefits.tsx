import { CheckCircle } from "lucide-react";
import type { Service } from "@/types";

interface ServiceBenefitsProps {
  service: Service;
}

export function ServiceBenefits({ service }: ServiceBenefitsProps) {
  return (
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
  );
}
