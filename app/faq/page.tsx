"use client";

import { useState, useMemo } from "react";
import { faqs } from "@/data/faqs";
import { FAQ_TOPICS } from "@/lib/constants";
import { Search, ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Filter FAQs based on search and topic
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTopic =
        selectedTopic === "all" || faq.topic === selectedTopic;

      return matchesSearch && matchesTopic;
    });
  }, [searchQuery, selectedTopic]);

  // Group FAQs by topic
  const groupedFAQs = useMemo(() => {
    const groups: Record<string, typeof faqs> = {};
    filteredFAQs.forEach((faq) => {
      const topic = faq.topic || "General";
      if (!groups[topic]) {
        groups[topic] = [];
      }
      groups[topic].push(faq);
    });
    return groups;
  }, [filteredFAQs]);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Help Center
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Frequently Asked
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary mt-2">
                Questions
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Find answers to common questions about our services, process, and
              pricing.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Topic Filter */}
      <section className="py-8 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSelectedTopic("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTopic === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              All Topics
            </button>
            {FAQ_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedTopic === topic
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="text-center mt-4 text-sm text-muted-foreground">
            Showing {filteredFAQs.length}{" "}
            {filteredFAQs.length === 1 ? "question" : "questions"}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No questions found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or topic filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic("all");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : selectedTopic === "all" ? (
            // Group by topic
            <div className="space-y-12">
              {Object.entries(groupedFAQs).map(([topic, topicFAQs]) => (
                <div key={topic}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1 h-8 bg-linear-to-b from-primary to-secondary rounded-full"></span>
                    {topic}
                  </h2>
                  <div className="space-y-4">
                    {topicFAQs.map((faq) => (
                      <div
                        key={faq.id}
                        className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all"
                      >
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
                        >
                          <span className="font-semibold text-foreground flex-1">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                              openItems.has(faq.id) ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openItems.has(faq.id) && (
                          <div className="px-6 py-5 border-t border-border bg-muted/20">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Single topic view
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground flex-1">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                        openItems.has(faq.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openItems.has(faq.id) && (
                    <div className="px-6 py-5 border-t border-border bg-muted/20">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Can't find the answer you're looking for? Our team is here to help.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:scale-105 transition-all shadow-xl"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
