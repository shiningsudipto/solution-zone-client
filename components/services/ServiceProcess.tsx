import { ArrowRight } from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
}

interface ServiceProcessProps {
  steps: readonly ProcessStep[];
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  return (
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
          {steps.map((step, index) => (
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
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 text-primary/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
