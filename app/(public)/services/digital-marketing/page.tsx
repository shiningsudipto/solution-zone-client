import { services } from "@/data/services";
import { PROCESS_STEPS } from "@/lib/constants";
import { notFound } from "next/navigation";
import { TrendingUp, Search, Users, Zap } from "lucide-react";

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

export default function DigitalMarketingPage() {
  const service = services.find((s) => s.slug === "digital-marketing");

  if (!service) {
    notFound();
  }

  // Tools for Digital Marketing
  const tools = [
    { name: "Google Analytics", icon: TrendingUp },
    { name: "Google Ads", icon: Search },
    { name: "Facebook Ads", icon: Users },
    { name: "SEMrush", icon: Search },
    { name: "Mailchimp", icon: Zap },
    { name: "HubSpot", icon: TrendingUp },
  ];

  // FAQ topics for Digital Marketing
  const faqTopics = ["Marketing", "Services", "Process"];

  return (
    <div className="min-h-screen">
      <ServiceHero service={service} />
      <ServiceDescription service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess steps={PROCESS_STEPS.marketing} />
      <ServiceBenefits service={service} />
      <ServiceTools tools={tools} />
      <ServiceCaseStudies />
      <FAQSection limit={6} topics={faqTopics} />
      <ServiceCTA serviceTitle={service.title} />
    </div>
  );
}
