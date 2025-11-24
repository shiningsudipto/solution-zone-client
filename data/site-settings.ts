import type { SiteSettings } from "../types";

export const siteSettings: SiteSettings = {
  id: "site-001",
  siteName: "Solution Zone",
  email: "hello@solutionzone.com",
  phone: "+1 (555) 123-4567",
  address: "123 Innovation Street, Suite 500, San Francisco, CA 94103",
  logo: "/logo.svg",
  socialLinks: [
    { provider: "twitter", url: "https://twitter.com/solutionzone" },
    { provider: "linkedin", url: "https://linkedin.com/company/solutionzone" },
    { provider: "facebook", url: "https://facebook.com/solutionzone" },
    { provider: "instagram", url: "https://instagram.com/solutionzone" },
    { provider: "github", url: "https://github.com/solutionzone" },
    { provider: "dribbble", url: "https://dribbble.com/solutionzone" },
  ],
  legal: {
    privacyUrl: "/privacy-policy",
    termsUrl: "/terms-conditions",
  },
};
