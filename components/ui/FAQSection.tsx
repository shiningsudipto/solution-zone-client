"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQSectionProps {
  title?: string;
  description?: string;
  limit?: number;
  topics?: string[];
  className?: string;
}

export function FAQSection({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about our services and process.",
  limit,
  topics,
  className = "",
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Filter FAQs
  const filteredFAQs = faqs.filter((faq) => {
    if (topics && topics.length > 0) {
      return faq.topic && topics.includes(faq.topic);
    }
    return true;
  });

  // Apply limit
  const displayFAQs = limit ? filteredFAQs.slice(0, limit) : filteredFAQs;

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (displayFAQs.length === 0) return null;

  return (
    <section className={`py-20 sm:py-32 bg-background ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {displayFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground flex-1 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                    openItems.has(faq.id) ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openItems.has(faq.id)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
