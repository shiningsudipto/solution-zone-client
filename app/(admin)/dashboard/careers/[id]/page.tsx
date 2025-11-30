"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { careers as initialCareers } from "@/data/careers";
import type { Career } from "@/types";
import {
  ArrowLeft,
  Edit,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Star,
  Calendar,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

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

export default function ViewCareerPage() {
  const router = useRouter();
  const params = useParams();
  const [career, setCareer] = useState<Career | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundCareer = initialCareers.find((c) => c.id === id);
    if (foundCareer) {
      setCareer(foundCareer);
    } else {
      router.push("/dashboard/careers");
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

  const handleToggleStatus = () => {
    setCareer({ ...career, isActive: !career.isActive });
    // In a real app, this would update the backend
  };

  const formattedDate = new Date(career.postedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleToggleStatus}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
              career.isActive
                ? "border-green-500 text-green-600 hover:bg-green-50"
                : "border-gray-500 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {career.isActive ? (
              <>
                <ToggleRight className="w-5 h-5" />
                Active
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5" />
                Inactive
              </>
            )}
          </button>
          <button
            onClick={() => router.push(`/dashboard/careers/${career.id}/edit`)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            <Edit className="w-5 h-5" />
            Edit Posting
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
        {/* Title and Badges */}
        <div>
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
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                career.isActive
                  ? "bg-green-500/10 text-green-600 border-green-500/20"
                  : "bg-gray-500/10 text-gray-600 border-gray-500/20"
              }`}
            >
              {career.isActive ? "Active" : "Inactive"}
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

          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
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

        {/* Description */}
        <div className="pt-6 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            About the Role
          </h2>
          <div
            className="prose prose-sm max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: career.description }}
          />
        </div>

        {/* Responsibilities */}
        <div className="pt-6 border-t border-border">
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
        <div className="pt-6 border-t border-border">
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
          <div className="pt-6 border-t border-border">
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
          <div className="pt-6 border-t border-border">
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

        {/* Job Details */}
        <div className="pt-6 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Job Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Department</div>
              <div className="font-medium text-foreground">{career.department}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Location</div>
              <div className="font-medium text-foreground">{career.location}</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Employment Type
              </div>
              <div className="font-medium text-foreground">
                {typeLabels[career.type]}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Experience Level
              </div>
              <div className="font-medium text-foreground">
                {levelLabels[career.level]}
              </div>
            </div>
            {career.salary && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">
                  Salary Range
                </div>
                <div className="font-medium text-foreground">
                  ${career.salary.min.toLocaleString()} - $
                  {career.salary.max.toLocaleString()} {career.salary.currency}
                </div>
              </div>
            )}
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Status</div>
              <div className="font-medium text-foreground">
                {career.isActive ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
