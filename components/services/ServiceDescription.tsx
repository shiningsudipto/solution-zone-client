import type { Service } from "@/types";

interface ServiceDescriptionProps {
  service: Service;
}

export function ServiceDescription({ service }: ServiceDescriptionProps) {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: service.longDescription }}
        />
      </div>
    </section>
  );
}
