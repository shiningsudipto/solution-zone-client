import type { SiteSettings } from "../types";

export const siteSettings: SiteSettings = {
  id: "site-001",
  siteName: "Digital Agency",
  email: "hello@digitalagency.com",
  phone: "+1 (555) 123-4567",
  address: "123 Innovation Street, Suite 500, San Francisco, CA 94103",
  logo: "/logo.svg",
  socialLinks: [
    { provider: "twitter", url: "https://twitter.com/digitalagency" },
    { provider: "linkedin", url: "https://linkedin.com/company/digitalagency" },
    { provider: "facebook", url: "https://facebook.com/digitalagency" },
    { provider: "instagram", url: "https://instagram.com/digitalagency" },
    { provider: "github", url: "https://github.com/digitalagency" },
    { provider: "dribbble", url: "https://dribbble.com/digitalagency" },
  ],
  legal: {
    privacyUrl: "/privacy-policy",
    termsUrl: "/terms-conditions",
  },
};
