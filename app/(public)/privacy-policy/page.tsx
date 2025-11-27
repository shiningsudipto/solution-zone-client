import { SITE_INFO } from "@/lib/constants";
import { Shield, Lock, Eye, Database, UserCheck, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Shield className="w-4 h-4" />
              Legal
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Privacy
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary mt-2">
                Policy
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
                At {SITE_INFO.name}, we take your privacy seriously. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website or use our
                services.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Information We Collect */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Information We Collect
                    </h2>
                    <p className="text-muted-foreground">
                      We collect information that you provide directly to us
                      when using our services.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-16">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Personal Information
                    </h3>
                    <p className="text-muted-foreground">
                      When you contact us or use our services, we may collect
                      personal information such as your name, email address,
                      phone number, company name, and any other information you
                      choose to provide.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Usage Data
                    </h3>
                    <p className="text-muted-foreground">
                      We automatically collect certain information about your
                      device and how you interact with our website, including IP
                      address, browser type, pages visited, and time spent on
                      pages.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Cookies and Tracking
                    </h3>
                    <p className="text-muted-foreground">
                      We use cookies and similar tracking technologies to track
                      activity on our website and store certain information to
                      improve your experience.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      How We Use Your Information
                    </h2>
                    <p className="text-muted-foreground">
                      We use the information we collect for various purposes.
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 pl-16 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>To provide, maintain, and improve our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      To respond to your inquiries and provide customer support
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      To send you updates, newsletters, and marketing
                      communications (with your consent)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      To analyze usage patterns and improve our website
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      To detect, prevent, and address technical issues or
                      fraudulent activity
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>To comply with legal obligations</span>
                  </li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <UserCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Information Sharing and Disclosure
                    </h2>
                    <p className="text-muted-foreground">
                      We do not sell your personal information. We may share
                      your information in the following circumstances.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pl-16">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Service Providers
                    </h3>
                    <p className="text-muted-foreground">
                      We may share your information with third-party service
                      providers who perform services on our behalf, such as
                      hosting, analytics, and email delivery.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Legal Requirements
                    </h3>
                    <p className="text-muted-foreground">
                      We may disclose your information if required by law or in
                      response to valid requests by public authorities.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Business Transfers
                    </h3>
                    <p className="text-muted-foreground">
                      In the event of a merger, acquisition, or sale of assets,
                      your information may be transferred as part of that
                      transaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Data Security
                    </h2>
                    <p className="text-muted-foreground">
                      We implement appropriate technical and organizational
                      measures to protect your personal information.
                    </p>
                  </div>
                </div>

                <p className="pl-16 text-muted-foreground">
                  While we strive to protect your personal information, no
                  method of transmission over the Internet or electronic storage
                  is 100% secure. We cannot guarantee absolute security but
                  continuously work to improve our security practices.
                </p>
              </div>

              {/* Your Rights */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Your Rights
                    </h2>
                    <p className="text-muted-foreground">
                      You have certain rights regarding your personal
                      information.
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 pl-16 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Access and receive a copy of your personal information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Correct inaccurate or incomplete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Request deletion of your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Object to or restrict certain processing of your
                      information
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Withdraw consent at any time where we rely on consent
                    </span>
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-linear-to-br from-primary/5 to-secondary/5 border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us at:
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
