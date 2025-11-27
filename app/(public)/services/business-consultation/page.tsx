import { services } from "@/data/services";
import { PROCESS_STEPS } from "@/lib/constants";
import { notFound } from "next/navigation";
import {
  Lightbulb,
  TrendingUp,
  Zap,
  Search,
  Shield,
  Users,
} from "lucide-react";

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

export default function BusinessConsultationPage() {
  const service = services.find((s) => s.slug === "business-consultation");

  if (!service) {
    notFound();
  }

  // Tools for Business Consultation
  const tools = [
    { name: "Strategic Planning", icon: Lightbulb },
    { name: "Data Analysis", icon: TrendingUp },
    { name: "Process Mapping", icon: Zap },
    { name: "Market Research", icon: Search },
    { name: "ROI Tracking", icon: Shield },
    { name: "Change Management", icon: Users },
  ];

  // FAQ topics for Business Consultation
  const faqTopics = ["Services", "Process", "About"];

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
