import { services } from "@/data/services";
import { ServiceDetailLayout } from "@/components/ServiceDetailLayout";
import { notFound } from "next/navigation";

export default function UIUXDesignPage() {
  const service = services.find((s) => s.slug === "ui-ux-design");

  if (!service) {
    notFound();
  }

  return <ServiceDetailLayout service={service} />;
}
