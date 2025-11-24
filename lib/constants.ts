/**
 * Brand Colors - Digital Agency
 * As defined in .gemini/instructions.md
 */
export const COLORS = {
  primary: "#a44efd",
  secondary: "#fd920a",
  accent: "#a1d69c",
  background: {
    light: "#fdfbf9",
    white: "#ffffff",
  },
  text: {
    primary: "#0f0f0f",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",
  },
} as const;

/**
 * Site Information
 */
export const SITE_INFO = {
  name: "Digital Agency",
  tagline: "Transforming Ideas into Digital Excellence",
  description:
    "We are a full-service digital agency offering UI/UX design, web & app development, marketing, and business consultation services.",
  email: "hello@digitalagency.com",
  phone: "+1 (555) 123-4567",
  address: "123 Innovation Street, Suite 500, San Francisco, CA 94103",
} as const;

/**
 * Social Media Links
 */
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/digitalagency",
  linkedin: "https://linkedin.com/company/digitalagency",
  facebook: "https://facebook.com/digitalagency",
  instagram: "https://instagram.com/digitalagency",
  github: "https://github.com/digitalagency",
  dribbble: "https://dribbble.com/digitalagency",
} as const;

/**
 * Navigation Links
 */
export const NAV_LINKS = {
  public: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  dashboard: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/dashboard/projects" },
    { label: "Tasks", href: "/dashboard/tasks" },
    { label: "Team", href: "/dashboard/team" },
    { label: "Contacts", href: "/dashboard/contacts" },
    { label: "Blog", href: "/dashboard/blog" },
  ],
} as const;

/**
 * Service Categories
 */
export const SERVICE_CATEGORIES = [
  "UI/UX Design",
  "Web Development",
  "App Development",
  "Digital Marketing",
  "Business Consultation",
] as const;

/**
 * Project Status Options
 */
export const PROJECT_STATUSES = [
  { value: "proposal", label: "Proposal" },
  { value: "active", label: "Active" },
  { value: "on-hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
  { value: "archived", label: "Archived" },
] as const;

/**
 * Task Status Options
 */
export const TASK_STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
] as const;

/**
 * Task Priority Options
 */
export const TASK_PRIORITIES = [
  { value: "low", label: "Low", color: "gray" },
  { value: "medium", label: "Medium", color: "yellow" },
  { value: "high", label: "High", color: "red" },
] as const;

/**
 * Contact Status Options
 */
export const CONTACT_STATUSES = [
  { value: "new", label: "New" },
  { value: "in-review", label: "In Review" },
  { value: "contacted", label: "Contacted" },
  { value: "closed", label: "Closed" },
] as const;

/**
 * Blog Post Types
 */
export const BLOG_POST_TYPES = [
  { value: "article", label: "Article" },
  { value: "case-study", label: "Case Study" },
] as const;

/**
 * FAQ Topics
 */
export const FAQ_TOPICS = [
  "Services",
  "Process",
  "Pricing",
  "Technology",
  "Support",
  "Marketing",
  "Legal",
  "About",
] as const;

/**
 * Testimonials (for public pages)
 */
export const TESTIMONIALS = [
  {
    id: "test-001",
    name: "John Davis",
    role: "CEO",
    company: "TechStore Inc.",
    avatar: "/testimonials/john.jpg",
    content:
      "Working with this agency transformed our online presence. The redesign increased our conversion rate by 150%. Highly recommended!",
    rating: 5,
  },
  {
    id: "test-002",
    name: "Sarah Mitchell",
    role: "Product Manager",
    company: "HealthTrack Solutions",
    avatar: "/testimonials/sarah.jpg",
    content:
      "The team's expertise in UX design helped us solve complex problems and create an intuitive platform our users love.",
    rating: 5,
  },
  {
    id: "test-003",
    name: "Michael Chen",
    role: "Marketing Director",
    company: "GreenLeaf Organics",
    avatar: "/testimonials/michael.jpg",
    content:
      "Their digital marketing strategies delivered exceptional results. Our engagement increased dramatically across all channels.",
    rating: 5,
  },
] as const;

/**
 * Company Stats (for About/Home page)
 */
export const COMPANY_STATS = [
  { label: "Years Experience", value: "12+" },
  { label: "Projects Completed", value: "500+" },
  { label: "Global Clients", value: "200+" },
  { label: "Team Members", value: "50+" },
] as const;

/**
 * Process Steps (for service pages)
 */
export const PROCESS_STEPS = {
  design: [
    { title: "Discovery", description: "Understanding your needs and goals" },
    {
      title: "Research",
      description: "User research and competitive analysis",
    },
    { title: "Design", description: "Creating beautiful, functional designs" },
    { title: "Testing", description: "Validating with real users" },
  ],
  development: [
    { title: "Planning", description: "Architecture and technology decisions" },
    { title: "Development", description: "Building with best practices" },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and optimization",
    },
    { title: "Launch", description: "Deployment and monitoring" },
  ],
  marketing: [
    { title: "Strategy", description: "Defining goals and target audience" },
    {
      title: "Content Creation",
      description: "Compelling content that converts",
    },
    { title: "Campaign Launch", description: "Multi-channel execution" },
    {
      title: "Optimization",
      description: "Continuous improvement based on data",
    },
  ],
} as const;
