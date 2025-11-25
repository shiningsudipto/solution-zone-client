import { services } from "@/data/services";
import { ServiceDetailLayout } from "@/components/ServiceDetailLayout";
import { notFound } from "next/navigation";

export default function AppDevelopmentPage() {
  const service = services.find((s) => s.slug === "app-development");

  if (!service) {
    notFound();
  }

  return <ServiceDetailLayout service={service} />;
}
