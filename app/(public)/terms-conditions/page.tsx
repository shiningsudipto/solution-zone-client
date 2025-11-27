import { SITE_INFO } from "@/lib/constants";
import {
  FileText,
  Scale,
  AlertCircle,
  UserX,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function TermsConditionsPage() {
  const lastUpdated = "November 24, 2024";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Scale className="w-4 h-4" />
              Legal
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Terms &
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary mt-2">
                Conditions
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Welcome to {SITE_INFO.name}. These Terms and Conditions govern
                your use of our website and services. By accessing or using our
                services, you agree to be bound by these terms.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Acceptance of Terms */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Acceptance of Terms
                    </h2>
                    <p className="text-muted-foreground">
                      By using our services, you confirm your acceptance of
                      these Terms and Conditions.
                    </p>
                  </div>
                </div>

                <p className="pl-16 text-muted-foreground">
                  If you do not agree to these terms, you must not use our
                  website or services. We reserve the right to modify these
                  terms at any time, and your continued use of our services
                  constitutes acceptance of any changes.
                </p>
              </div>

              {/* Services */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Services
                    </h2>
                    <p className="text-muted-foreground">
                      {SITE_INFO.name} provides digital services including
                      design, development, marketing, and consultation.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-16">
                  <p className="text-muted-foreground">
                    We strive to provide high-quality services but do not
                    guarantee specific results or outcomes. Service delivery
                    timelines are estimates and may be subject to change based
                    on project complexity and client responsiveness.
                  </p>

                  <p className="text-muted-foreground">
                    All services are provided subject to availability and our
                    acceptance of your project. We reserve the right to decline
                    any project at our discretion.
                  </p>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      User Responsibilities
                    </h2>
                    <p className="text-muted-foreground">
                      When using our services, you agree to certain
                      responsibilities.
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 pl-16 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Provide accurate and complete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Maintain the confidentiality of your account credentials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Use our services only for lawful purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Not interfere with or disrupt our services or servers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Respect intellectual property rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Provide timely feedback and approvals for project
                      milestones
                    </span>
                  </li>
                </ul>
              </div>

              {/* Payment Terms */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Payment Terms
                    </h2>
                    <p className="text-muted-foreground">
                      Payment terms are established in individual service
                      agreements.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-16">
                  <p className="text-muted-foreground">
                    Unless otherwise agreed, payments are typically structured
                    as follows: a deposit upon project commencement, milestone
                    payments during development, and final payment upon
                    completion.
                  </p>

                  <p className="text-muted-foreground">
                    Late payments may incur additional fees. We reserve the
                    right to suspend services for overdue accounts.
                  </p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Intellectual Property
                    </h2>
                    <p className="text-muted-foreground">
                      Ownership of deliverables is transferred upon full
                      payment, unless otherwise specified.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-16">
                  <p className="text-muted-foreground">
                    All work created specifically for you becomes your property
                    upon receipt of final payment. However, we retain the right
                    to use the work in our portfolio and marketing materials
                    unless a non-disclosure agreement specifies otherwise.
                  </p>

                  <p className="text-muted-foreground">
                    You grant us a license to use any materials you provide
                    solely for the purpose of delivering the agreed-upon
                    services.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <AlertCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Limitation of Liability
                    </h2>
                    <p className="text-muted-foreground">
                      Our liability is limited as described below.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-16">
                  <p className="text-muted-foreground">
                    To the maximum extent permitted by law, {SITE_INFO.name}{" "}
                    shall not be liable for any indirect, incidental, special,
                    consequential, or punitive damages arising from your use of
                    our services.
                  </p>

                  <p className="text-muted-foreground">
                    Our total liability for any claims arising from our services
                    shall not exceed the amount paid by you for those specific
                    services.
                  </p>
                </div>
              </div>

              {/* Termination */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <UserX className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Termination
                    </h2>
                    <p className="text-muted-foreground">
                      Either party may terminate services under certain
                      conditions.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-16">
                  <p className="text-muted-foreground">
                    You may terminate services by providing written notice. We
                    may terminate services if you breach these terms or fail to
                    make required payments.
                  </p>

                  <p className="text-muted-foreground">
                    Upon termination, you remain liable for any outstanding
                    payments for work completed. Any prepaid amounts for
                    incomplete work may be refunded at our discretion, minus any
                    costs incurred.
                  </p>
                </div>
              </div>

              {/* Governing Law */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Scale className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Governing Law
                    </h2>
                    <p className="text-muted-foreground">
                      These terms are governed by the laws of California, United
                      States.
                    </p>
                  </div>
                </div>

                <p className="pl-16 text-muted-foreground">
                  Any disputes arising from these terms or our services shall be
                  resolved through binding arbitration in San Francisco,
                  California, in accordance with the rules of the American
                  Arbitration Association.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-linear-to-br from-primary/5 to-secondary/5 border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Questions About These Terms?
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions regarding these Terms and
                  Conditions, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Email:</strong>{" "}
                    {SITE_INFO.email}
                  </p>
                  <p>
                    <strong className="text-foreground">Phone:</strong>{" "}
                    {SITE_INFO.phone}
                  </p>
                  <p>
                    <strong className="text-foreground">Address:</strong>{" "}
                    {SITE_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
