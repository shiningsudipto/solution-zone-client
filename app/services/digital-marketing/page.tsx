import { services } from "@/data/services";
import { ServiceDetailLayout } from "@/components/ServiceDetailLayout";
import { notFound } from "next/navigation";

export default function DigitalMarketingPage() {
  const service = services.find((s) => s.slug === "digital-marketing");

  if (!service) {
    notFound();
  }

  return <ServiceDetailLayout service={service} />;
}
