import type { ContactSubmission } from "../types";

export const contactSubmissions: ContactSubmission[] = [
  {
    id: "contact-001",
    name: "John Davis",
    email: "john.davis@example.com",
    phone: "+1 555-0123",
    message:
      "I'm interested in getting a website redesign for my e-commerce business. Would love to discuss the possibilities.",
    source: "Contact Form",
    status: "contacted",
    createdAt: "2024-03-15T10:30:00Z",
    assignedTo: "tm-001",
    notes:
      "Scheduled call for March 20th. Interested in full redesign with focus on mobile experience.",
  },
  {
    id: "contact-002",
    name: "Sarah Mitchell",
    email: "sarah.m@techstartup.io",
    phone: "+1 555-0456",
    message:
      "We need help with our app development project. Looking for a team with React Native experience.",
    source: "Contact Form",
    status: "in-review",
    createdAt: "2024-03-20T14:15:00Z",
    assignedTo: "tm-002",
    notes: "Reviewing project scope. Potential 6-month engagement.",
  },
  {
    id: "contact-003",
    name: "Michael Chen",
    email: "mchen@greenleaf.com",
    phone: "+1 555-0789",
    message:
      "Looking for a digital marketing partner to help with our spring campaign. Need expertise in social media and content marketing.",
    source: "LinkedIn",
    status: "contacted",
    createdAt: "2024-03-18T09:45:00Z",
    assignedTo: "tm-003",
    notes: "Initial proposal sent. Awaiting feedback on budget.",
  },
  {
    id: "contact-004",
    name: "Emily Rodriguez",
    email: "emily.r@healthplus.com",
    message:
      "We're a healthcare company looking to improve our patient portal UX. Can you help?",
    source: "Contact Form",
    status: "new",
    createdAt: "2024-03-25T16:20:00Z",
  },
  {
    id: "contact-005",
    name: "David Thompson",
    email: "dthompson@manufacturing.com",
    phone: "+1 555-0321",
    message:
      "Our company is undergoing digital transformation. We need consultation on technology strategy and implementation.",
    source: "Referral",
    status: "new",
    createdAt: "2024-03-26T11:00:00Z",
  },
  {
    id: "contact-006",
    name: "Lisa Anderson",
    email: "l.anderson@retailco.com",
    message:
      "Interested in SEO and content marketing services for our retail brand.",
    source: "Contact Form",
    status: "in-review",
    createdAt: "2024-03-22T13:30:00Z",
    assignedTo: "tm-003",
    notes: "Competitor analysis completed. Preparing proposal.",
  },
  {
    id: "contact-007",
    name: "Robert Kim",
    email: "robert.kim@fintech.io",
    phone: "+1 555-0654",
    message:
      "We need a secure web application built for financial services. Compliance and security are top priorities.",
    source: "Contact Form",
    status: "closed",
    createdAt: "2024-02-28T10:15:00Z",
    assignedTo: "tm-002",
    notes: "Project completed successfully. Client very satisfied.",
  },
  {
    id: "contact-008",
    name: "Jennifer White",
    email: "j.white@nonprofit.org",
    message:
      "We're a non-profit looking for help with our website and donor management system.",
    source: "Contact Form",
    status: "contacted",
    createdAt: "2024-03-19T15:45:00Z",
    assignedTo: "tm-001",
    notes: "Discussed special pricing for non-profit. Proposal in progress.",
  },
  {
    id: "contact-009",
    name: "Alex Johnson",
    email: "alex@startupidea.com",
    message:
      "I have an idea for a mobile app and need help with design and development.",
    source: "Twitter",
    status: "new",
    createdAt: "2024-03-27T09:30:00Z",
  },
  {
    id: "contact-010",
    name: "Maria Garcia",
    email: "maria.garcia@restaurant.com",
    phone: "+1 555-0987",
    message:
      "Need a website for our restaurant chain with online ordering capabilities.",
    source: "Google Search",
    status: "in-review",
    createdAt: "2024-03-24T12:00:00Z",
    assignedTo: "tm-001",
    notes: "Researching best e-commerce platforms for restaurant industry.",
  },
];
