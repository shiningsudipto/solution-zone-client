import { services } from "@/data/services";
import { ServiceDetailLayout } from "@/components/ServiceDetailLayout";
import { notFound } from "next/navigation";

export default function BusinessConsultationPage() {
  const service = services.find((s) => s.slug === "business-consultation");

  if (!service) {
    notFound();
  }

  return <ServiceDetailLayout service={service} />;
}
