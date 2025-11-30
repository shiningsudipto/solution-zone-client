"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { careers as allCareers } from "@/data/careers";
import type { Career } from "@/types";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Star,
  Send,
  Calendar,
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

const levelColors = {
  entry: "bg-green-500/10 text-green-600 border-green-500/20",
  mid: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  senior: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  lead: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

export default function CareerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [career, setCareer] = useState<Career | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundCareer = allCareers.find((c) => c.id === id);
    if (foundCareer && foundCareer.isActive) {
      setCareer(foundCareer);
    } else {
      router.push("/careers");
    }
  }, [params.id, router]);

  if (!career) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(career.postedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <section className="py-8 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                    levelColors[career.level]
                  }`}
                >
                  {levelLabels[career.level]}
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20">
                  {typeLabels[career.type]}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-4">
                {career.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span>{career.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{career.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{typeLabels[career.type]}</span>
                </div>
                {career.salary && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span>
                      ${career.salary.min.toLocaleString()} - $
                      {career.salary.max.toLocaleString()} {career.salary.currency}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() =>
                  (window.location.href = `mailto:careers@solutionzone.com?subject=Application for ${career.title}`)
                }
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                <Send className="w-5 h-5" />
                Apply Now
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Posted {formattedDate}</span>
            </div>
            {career.applicants !== undefined && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{career.applicants} applicants</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  About the Role
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {career.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {career.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {career.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              {career.niceToHave && career.niceToHave.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Nice to Have
                  </h2>
                  <ul className="space-y-3">
                    {career.niceToHave.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {career.benefits && career.benefits.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    What We Offer
                  </h2>
                  <ul className="space-y-3">
                    {career.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Ready to Apply?
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Submit your application and join our team of talented
                  professionals.
                </p>
                <button
                  onClick={() =>
                    (window.location.href = `mailto:careers@solutionzone.com?subject=Application for ${career.title}`)
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Apply via Email
                </button>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Or send your resume directly to{" "}
                  <a
                    href="mailto:careers@solutionzone.com"
                    className="text-primary hover:underline"
                  >
                    careers@solutionzone.com
                  </a>
                </p>
              </div>

              {/* Job Details Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Job Details
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Department</div>
                    <div className="font-medium text-foreground">
                      {career.department}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Location</div>
                    <div className="font-medium text-foreground">
                      {career.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">
                      Employment Type
                    </div>
                    <div className="font-medium text-foreground">
                      {typeLabels[career.type]}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">
                      Experience Level
                    </div>
                    <div className="font-medium text-foreground">
                      {levelLabels[career.level]}
                    </div>
                  </div>
                  {career.salary && (
                    <div>
                      <div className="text-muted-foreground mb-1">
                        Salary Range
                      </div>
                      <div className="font-medium text-foreground">
                        ${career.salary.min.toLocaleString()} - $
                        {career.salary.max.toLocaleString()}{" "}
                        {career.salary.currency}
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-muted-foreground mb-1">Posted Date</div>
                    <div className="font-medium text-foreground">
                      {formattedDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Share this Job
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => {
                      const text = `Check out this job: ${career.title} at SolutionZone`;
                      const url = window.location.href;
                      window.open(
                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          text
                        )}&url=${encodeURIComponent(url)}`,
                        "_blank"
                      );
                    }}
                    className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Jobs */}
      <section className="py-12 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Similar Positions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {allCareers
              .filter(
                (c) =>
                  c.isActive &&
                  c.id !== career.id &&
                  (c.department === career.department || c.level === career.level)
              )
              .slice(0, 4)
              .map((similarCareer) => (
                <Link
                  key={similarCareer.id}
                  href={`/careers/${similarCareer.id}`}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {similarCareer.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {similarCareer.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {similarCareer.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {typeLabels[similarCareer.type]}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
