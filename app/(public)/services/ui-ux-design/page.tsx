import { services } from "@/data/services";
import { PROCESS_STEPS } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Palette, Lightbulb, Zap, Users } from "lucide-react";

// Import service components
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceDescription } from "@/components/services/ServiceDescription";
import { ServiceFeatures } from "@/components/services/ServiceFeatures";
import { ServiceProcess } from "@/components/services/ServiceProcess";
import { ServiceBenefits } from "@/components/services/ServiceBenefits";
import { ServiceTools } from "@/components/services/ServiceTools";
import { ServiceCaseStudies } from "@/components/services/ServiceCaseStudies";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { FAQSection } from "@/components/ui/FAQSection";

export default function UIUXDesignPage() {
  const service = services.find((s) => s.slug === "ui-ux-design");

  if (!service) {
    notFound();
  }

  // Tools for UI/UX Design
  const tools = [
    { name: "Figma", icon: Palette },
    { name: "Adobe XD", icon: Palette },
    { name: "Sketch", icon: Palette },
    { name: "InVision", icon: Lightbulb },
    { name: "Principle", icon: Zap },
    { name: "Maze", icon: Users },
  ];

  // FAQ topics for UI/UX Design
  const faqTopics = ["Process", "Services", "Technology"];

  return (
    <div className="min-h-screen">
      <ServiceHero service={service} />
      <ServiceDescription service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess steps={PROCESS_STEPS.design} />
      <ServiceBenefits service={service} />
      <ServiceTools tools={tools} />
      <ServiceCaseStudies />
      <FAQSection limit={6} topics={faqTopics} />
      <ServiceCTA serviceTitle={service.title} />
    </div>
  );
}
