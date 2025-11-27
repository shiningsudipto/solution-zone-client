import { services } from "@/data/services";
import { PROCESS_STEPS } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Smartphone, Code, Zap, Globe } from "lucide-react";

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

export default function AppDevelopmentPage() {
  const service = services.find((s) => s.slug === "app-development");

  if (!service) {
    notFound();
  }

  // Tools for App Development
  const tools = [
    { name: "React Native", icon: Smartphone },
    { name: "Flutter", icon: Smartphone },
    { name: "Swift", icon: Code },
    { name: "Kotlin", icon: Code },
    { name: "Firebase", icon: Zap },
    { name: "App Store", icon: Globe },
  ];

  // FAQ topics for App Development
  const faqTopics = ["Technology", "Process", "Services"];

  return (
    <div className="min-h-screen">
      <ServiceHero service={service} />
      <ServiceDescription service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess steps={PROCESS_STEPS.development} />
      <ServiceBenefits service={service} />
      <ServiceTools tools={tools} />
      <ServiceCaseStudies />
      <FAQSection limit={6} topics={faqTopics} />
      <ServiceCTA serviceTitle={service.title} />
    </div>
  );
}
