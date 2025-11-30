"use client";

import { useState } from "react";
import { careers as allCareers } from "@/data/careers";
import type { Career } from "@/types";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Search,
  Filter,
  Users,
  TrendingUp,
  Heart,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const typeLabels = {
  "full-time": "Full Time",
  "part-time": "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const levelLabels = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
  lead: "Lead",
};

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Filter careers
  const filteredCareers = allCareers.filter((career) => {
    if (!career.isActive) return false;

    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || career.department === departmentFilter;
    const matchesLocation =
      locationFilter === "all" || career.location === locationFilter;
    const matchesType = typeFilter === "all" || career.type === typeFilter;

    return matchesSearch && matchesDepartment && matchesLocation && matchesType;
  });

  // Get unique values for filters
  const departments = Array.from(
    new Set(allCareers.map((c) => c.department))
  ).sort();
  const locations = Array.from(new Set(allCareers.map((c) => c.location))).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Help us build the future of digital solutions. We're looking for
              talented individuals who are passionate about technology and
              innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">
                  {allCareers.filter((c) => c.isActive).length} Open Positions
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">
                  Remote & On-site
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-border">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">Fast Growing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Work With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Great Culture
              </h3>
              <p className="text-muted-foreground">
                Work with talented, passionate people in a collaborative and
                supportive environment that values work-life balance.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Career Growth
              </h3>
              <p className="text-muted-foreground">
                Continuous learning opportunities, mentorship programs, and clear
                career progression paths to help you reach your potential.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Great Benefits
              </h3>
              <p className="text-muted-foreground">
                Competitive compensation, comprehensive health benefits, flexible
                work arrangements, and generous time off policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Open Positions
          </h2>

          {/* Filters */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredCareers.map((career) => (
              <div
                key={career.id}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {career.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        {career.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {career.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {typeLabels[career.type]}
                      </span>
                      {career.salary && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          ${career.salary.min.toLocaleString()} - $
                          {career.salary.max.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                      {levelLabels[career.level]}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {career.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {career.applicants} applicants
                  </div>
                  <Link
                    href={`/careers/${career.id}`}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-2xl">
              <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
              <p className="text-muted-foreground">
                No positions found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Don't See a Perfect Fit?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for talented individuals. Send us your resume
            and we'll keep you in mind for future opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
