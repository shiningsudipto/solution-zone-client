import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last Updated: January 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-8 space-y-12">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At SolutionZone, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access the
                site.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Personal Data
                  </h3>
                  <p>
                    We may collect personally identifiable information, such as
                    your name, email address, phone number, and company details
                    when you:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Fill out a contact form</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Request a quote or consultation</li>
                    <li>Create an account on our platform</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Automatically Collected Information
                  </h3>
                  <p>
                    When you visit our website, we may automatically collect
                    certain information about your device, including:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  How We Use Your Information
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>To provide, operate, and maintain our services</li>
                <li>
                  To improve, personalize, and expand our website and services
                </li>
                <li>
                  To understand and analyze how you use our website and services
                </li>
                <li>
                  To develop new products, services, features, and functionality
                </li>
                <li>
                  To communicate with you for customer service, updates, and
                  marketing purposes
                </li>
                <li>To process your transactions and manage your orders</li>
                <li>To send you newsletters and promotional materials</li>
                <li>To prevent fraudulent transactions and monitor against theft</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Data Security
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We use administrative, technical, and physical security measures
                to help protect your personal information. While we have taken
                reasonable steps to secure the personal information you provide
                to us, please be aware that despite our efforts, no security
                measures are perfect or impenetrable, and no method of data
                transmission can be guaranteed against any interception or other
                type of misuse.
              </p>
            </div>

            {/* Sharing Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Sharing Your Information
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We may share information we have collected about you in
                  certain situations. Your information may be disclosed as
                  follows:
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    By Law or to Protect Rights
                  </h3>
                  <p>
                    If we believe the release of information about you is
                    necessary to respond to legal process, to investigate or
                    remedy potential violations of our policies, or to protect
                    the rights, property, and safety of others.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Business Transfers
                  </h3>
                  <p>
                    We may share or transfer your information in connection with,
                    or during negotiations of, any merger, sale of company
                    assets, financing, or acquisition of all or a portion of our
                    business to another company.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Third-Party Service Providers
                  </h3>
                  <p>
                    We may share your information with third parties that perform
                    services for us or on our behalf, including payment
                    processing, data analysis, email delivery, hosting services,
                    customer service, and marketing assistance.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Your Privacy Rights
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong className="text-foreground">Access:</strong> Request
                    access to your personal data
                  </li>
                  <li>
                    <strong className="text-foreground">Correction:</strong>{" "}
                    Request correction of inaccurate data
                  </li>
                  <li>
                    <strong className="text-foreground">Deletion:</strong>{" "}
                    Request deletion of your personal data
                  </li>
                  <li>
                    <strong className="text-foreground">Opt-out:</strong>{" "}
                    Opt-out of marketing communications
                  </li>
                  <li>
                    <strong className="text-foreground">Data Portability:</strong>{" "}
                    Request a copy of your data in a portable format
                  </li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may use cookies, web beacons, tracking pixels, and other
                tracking technologies on our website to help customize the site
                and improve your experience. Most browsers are set to accept
                cookies by default. You can remove or reject cookies, but this
                could affect the availability and functionality of our services.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-8 border-t border-border">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Contact Us
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions or comments about this Privacy Policy,
                please contact us at:
              </p>
              <div className="bg-muted p-6 rounded-lg space-y-2 text-sm">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href="mailto:privacy@solutionzone.com"
                    className="text-primary hover:underline"
                  >
                    privacy@solutionzone.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Phone:</strong> +1 (234)
                  567-890
                </p>
                <p>
                  <strong className="text-foreground">Address:</strong> 123
                  Business Street, Tech City, TC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
