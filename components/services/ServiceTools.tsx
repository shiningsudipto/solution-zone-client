import { LucideIcon } from "lucide-react";

interface Tool {
  name: string;
  icon: LucideIcon;
}

interface ServiceToolsProps {
  tools: Tool[];
}

export function ServiceTools({ tools }: ServiceToolsProps) {
  return (
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
  );
}
