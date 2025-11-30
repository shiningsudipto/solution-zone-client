"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { RichTextEditor } from "@/components/RichTextEditor";
import { careers as initialCareers } from "@/data/careers";
import type { Career } from "@/types";
import { ArrowLeft, X, Save } from "lucide-react";

export default function EditCareerPage() {
  const router = useRouter();
  const params = useParams();
  const [career, setCareer] = useState<Partial<Career>>({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    level: "mid",
    description: "",
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    benefits: [],
    salary: {
      min: 0,
      max: 0,
      currency: "USD",
    },
    isActive: true,
  });

  useEffect(() => {
    const id = params.id as string;
    const foundCareer = initialCareers.find((c) => c.id === id);
    if (foundCareer) {
      setCareer(foundCareer);
    } else {
      router.push("/dashboard/careers");
    }
  }, [params.id, router]);

  const isValid =
    career.title &&
    career.department &&
    career.location &&
    career.description &&
    career.responsibilities?.some((r) => r.trim()) &&
    career.requirements?.some((r) => r.trim());

  const addItem = (
    field: "responsibilities" | "requirements" | "niceToHave" | "benefits"
  ) => {
    setCareer({
      ...career,
      [field]: [...(career[field] || []), ""],
    });
  };

  const updateItem = (
    field: "responsibilities" | "requirements" | "niceToHave" | "benefits",
    index: number,
    value: string
  ) => {
    const items = [...(career[field] || [])];
    items[index] = value;
    setCareer({
      ...career,
      [field]: items,
    });
  };

  const removeItem = (
    field: "responsibilities" | "requirements" | "niceToHave" | "benefits",
    index: number
  ) => {
    setCareer({
      ...career,
      [field]: (career[field] || []).filter((_, i) => i !== index),
    });
  };

  const handleSave = () => {
    if (isValid) {
      // In a real app, this would update the backend
      console.log("Updating career:", career);
      router.push(`/dashboard/careers/${career.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Edit Job Posting
            </h1>
            <p className="text-muted-foreground">
              Update the position details
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={career.title || ""}
                onChange={(e) => setCareer({ ...career, title: e.target.value })}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Senior Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={career.department || ""}
                onChange={(e) =>
                  setCareer({ ...career, department: e.target.value })
                }
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Engineering, Design, Marketing"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={career.location || ""}
                onChange={(e) =>
                  setCareer({ ...career, location: e.target.value })
                }
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., Remote, New York, NY"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Employment Type
              </label>
              <select
                value={career.type}
                onChange={(e) =>
                  setCareer({
                    ...career,
                    type: e.target.value as Career["type"],
                  })
                }
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Experience Level
              </label>
              <select
                value={career.level}
                onChange={(e) =>
                  setCareer({
                    ...career,
                    level: e.target.value as Career["level"],
                  })
                }
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Job Description <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              content={career.description || ""}
              onChange={(content) => setCareer({ ...career, description: content })}
              placeholder="Write a compelling job description..."
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Salary Range (Optional)
            </label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                value={career.salary?.min || ""}
                onChange={(e) =>
                  setCareer({
                    ...career,
                    salary: {
                      ...career.salary!,
                      min: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Min salary"
              />
              <input
                type="number"
                value={career.salary?.max || ""}
                onChange={(e) =>
                  setCareer({
                    ...career,
                    salary: {
                      ...career.salary!,
                      max: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Max salary"
              />
              <input
                type="text"
                value={career.salary?.currency || "USD"}
                onChange={(e) =>
                  setCareer({
                    ...career,
                    salary: { ...career.salary!, currency: e.target.value },
                  })
                }
                className="px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Currency"
              />
            </div>
          </div>

          {/* Responsibilities */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Responsibilities <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => addItem("responsibilities")}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:opacity-90"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {(career.responsibilities || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateItem("responsibilities", index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter responsibility"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("responsibilities", index)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Requirements <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => addItem("requirements")}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:opacity-90"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {(career.requirements || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateItem("requirements", index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter requirement"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("requirements", index)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Nice to Have */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Nice to Have (Optional)
              </label>
              <button
                type="button"
                onClick={() => addItem("niceToHave")}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:opacity-90"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {(career.niceToHave || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateItem("niceToHave", index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter nice-to-have skill"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("niceToHave", index)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">
                Benefits (Optional)
              </label>
              <button
                type="button"
                onClick={() => addItem("benefits")}
                className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:opacity-90"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-2">
              {(career.benefits || []).map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateItem("benefits", index, e.target.value)
                    }
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter benefit"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem("benefits", index)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={career.isActive || false}
                onChange={(e) =>
                  setCareer({ ...career, isActive: e.target.checked })
                }
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm font-medium text-foreground">
                Active (Visible on careers page)
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
