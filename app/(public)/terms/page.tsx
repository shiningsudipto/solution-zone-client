import {
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Mail,
} from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Terms of Service
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
                Agreement to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service constitute a legally binding agreement
                made between you, whether personally or on behalf of an entity
                ("you") and SolutionZone ("Company," "we," "us," or "our"),
                concerning your access to and use of the{" "}
                <span className="text-primary">solutionzone.com</span> website
                as well as any other media form, media channel, mobile website
                or mobile application related, linked, or otherwise connected
                thereto (collectively, the "Site"). By accessing the Site, you
                agree that you have read, understood, and agreed to be bound by
                all of these Terms of Service.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Intellectual Property Rights
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Unless otherwise indicated, the Site is our proprietary
                  property and all source code, databases, functionality,
                  software, website designs, audio, video, text, photographs,
                  and graphics on the Site (collectively, the "Content") and the
                  trademarks, service marks, and logos contained therein (the
                  "Marks") are owned or controlled by us or licensed to us, and
                  are protected by copyright and trademark laws and various
                  other intellectual property rights and unfair competition laws
                  of the United States, international copyright laws, and
                  international conventions.
                </p>
                <p>
                  The Content and the Marks are provided on the Site "AS IS" for
                  your information and personal use only. Except as expressly
                  provided in these Terms of Service, no part of the Site and no
                  Content or Marks may be copied, reproduced, aggregated,
                  republished, uploaded, posted, publicly displayed, encoded,
                  translated, transmitted, distributed, sold, licensed, or
                  otherwise exploited for any commercial purpose whatsoever,
                  without our express prior written permission.
                </p>
              </div>
            </div>

            {/* User Representations */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  User Representations
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  All registration information you submit will be true, accurate,
                  current, and complete
                </li>
                <li>
                  You will maintain the accuracy of such information and promptly
                  update such registration information as necessary
                </li>
                <li>
                  You have the legal capacity and you agree to comply with these
                  Terms of Service
                </li>
                <li>You are not a minor in the jurisdiction in which you reside</li>
                <li>
                  You will not access the Site through automated or non-human
                  means, whether through a bot, script or otherwise
                </li>
                <li>
                  You will not use the Site for any illegal or unauthorized
                  purpose
                </li>
                <li>
                  Your use of the Site will not violate any applicable law or
                  regulation
                </li>
              </ul>
            </div>

            {/* Prohibited Activities */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Prohibited Activities
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You may not access or use the Site for any purpose other than
                that for which we make the Site available. The Site may not be
                used in connection with any commercial endeavors except those
                that are specifically endorsed or approved by us. Prohibited
                activities include, but are not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Systematically retrieve data or other content from the Site to
                  create or compile a collection
                </li>
                <li>
                  Make any unauthorized use of the Site, including collecting
                  usernames and/or email addresses
                </li>
                <li>
                  Use the Site to advertise or offer to sell goods and services
                </li>
                <li>
                  Circumvent, disable, or otherwise interfere with
                  security-related features of the Site
                </li>
                <li>
                  Engage in unauthorized framing of or linking to the Site
                </li>
                <li>
                  Trick, defraud, or mislead us and other users, especially in
                  any attempt to learn sensitive account information
                </li>
                <li>
                  Make improper use of our support services or submit false
                  reports of abuse or misconduct
                </li>
                <li>
                  Engage in any automated use of the system, such as using
                  scripts to send comments or messages
                </li>
                <li>
                  Interfere with, disrupt, or create an undue burden on the Site
                  or the networks or services connected to the Site
                </li>
                <li>
                  Attempt to impersonate another user or person or use the
                  username of another user
                </li>
                <li>Use any information obtained from the Site to harass, abuse, or harm another person</li>
                <li>
                  Use the Site as part of any effort to compete with us or
                  otherwise use the Site for any revenue-generating endeavor
                </li>
                <li>Decipher, decompile, disassemble, or reverse engineer any of the software comprising the Site</li>
                <li>
                  Upload or transmit (or attempt to upload or transmit) viruses,
                  Trojan horses, or other material
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Services and Fees
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We reserve the right to change our services and pricing at any
                  time. We also reserve the right to refuse service to anyone
                  for any reason at any time.
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Payment Terms
                  </h3>
                  <p>
                    All fees are payable in accordance with the payment terms
                    presented to you at the time of purchase. We use third-party
                    payment processors and do not store your payment card
                    details. You agree to pay all charges at the prices then in
                    effect for your purchases, and you authorize us to charge
                    your chosen payment provider for any such amounts upon
                    placing your order.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Refund Policy
                  </h3>
                  <p>
                    All sales are final unless otherwise stated. If you believe
                    you have been charged in error, please contact us immediately
                    at billing@solutionzone.com.
                  </p>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">
                  Limitation of Liability
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE
                LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
                CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE
                DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR
                OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE
                BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING
                ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU
                FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE
                ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY,
                BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE
                OF ACTION ARISING.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Termination
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service shall remain in full force and effect
                while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF
                THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE
                DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND
                USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO
                ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT
                LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR
                COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY
                APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                PARTICIPATION IN THE SITE OR DELETE ANY CONTENT OR INFORMATION
                THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE
                DISCRETION.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and defined following the laws
                of the United States. SolutionZone and yourself irrevocably
                consent that the courts shall have exclusive jurisdiction to
                resolve any dispute which may arise in connection with these
                terms.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Modifications and Interruptions
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to change, modify, or remove the contents
                of the Site at any time or for any reason at our sole discretion
                without notice. However, we have no obligation to update any
                information on our Site. We also reserve the right to modify or
                discontinue all or part of the Site without notice at any time.
                We will not be liable to you or any third party for any
                modification, price change, suspension, or discontinuance of the
                Site.
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
                In order to resolve a complaint regarding the Site or to receive
                further information regarding use of the Site, please contact us
                at:
              </p>
              <div className="bg-muted p-6 rounded-lg space-y-2 text-sm">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href="mailto:legal@solutionzone.com"
                    className="text-primary hover:underline"
                  >
                    legal@solutionzone.com
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
