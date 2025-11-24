import type { TeamMember } from "../types";

export const teamMembers: TeamMember[] = [
  {
    id: "tm-001",
    name: "Sarah Johnson",
    role: "Creative Director",
    avatar: "/team/sarah.jpg",
    bio: "Sarah leads our creative vision with over 12 years of experience in digital design and brand strategy.",
    email: "sarah@digitalagency.com",
    socials: [
      { provider: "linkedin", url: "https://linkedin.com/in/sarahjohnson" },
      { provider: "twitter", url: "https://twitter.com/sarahdesigns" },
    ],
    joinedAt: "2018-03-15",
  },
  {
    id: "tm-002",
    name: "Michael Chen",
    role: "Lead Developer",
    avatar: "/team/michael.jpg",
    bio: "Michael specializes in building scalable web applications using modern frameworks and best practices.",
    email: "michael@digitalagency.com",
    socials: [
      { provider: "github", url: "https://github.com/michaelchen" },
      { provider: "linkedin", url: "https://linkedin.com/in/michaelchen" },
    ],
    joinedAt: "2019-06-20",
  },
  {
    id: "tm-003",
    name: "Emily Rodriguez",
    role: "Marketing Strategist",
    avatar: "/team/emily.jpg",
    bio: "Emily drives growth through data-driven marketing strategies and compelling brand narratives.",
    email: "emily@digitalagency.com",
    socials: [
      { provider: "linkedin", url: "https://linkedin.com/in/emilyrodriguez" },
      { provider: "twitter", url: "https://twitter.com/emilymarketing" },
    ],
    joinedAt: "2020-01-10",
  },
  {
    id: "tm-004",
    name: "David Park",
    role: "UI/UX Designer",
    avatar: "/team/david.jpg",
    bio: "David creates intuitive and beautiful user experiences that delight users and achieve business goals.",
    email: "david@digitalagency.com",
    socials: [
      { provider: "dribbble", url: "https://dribbble.com/davidpark" },
      { provider: "behance", url: "https://behance.net/davidpark" },
    ],
    joinedAt: "2020-08-05",
  },
  {
    id: "tm-005",
    name: "Jessica Williams",
    role: "Business Consultant",
    avatar: "/team/jessica.jpg",
    bio: "Jessica helps businesses transform digitally with strategic insights and actionable roadmaps.",
    email: "jessica@digitalagency.com",
    socials: [
      { provider: "linkedin", url: "https://linkedin.com/in/jessicawilliams" },
    ],
    joinedAt: "2019-11-12",
  },
  {
    id: "tm-006",
    name: "Alex Thompson",
    role: "Full Stack Developer",
    avatar: "/team/alex.jpg",
    bio: "Alex builds end-to-end solutions with expertise in both frontend and backend technologies.",
    email: "alex@digitalagency.com",
    socials: [
      { provider: "github", url: "https://github.com/alexthompson" },
      { provider: "linkedin", url: "https://linkedin.com/in/alexthompson" },
    ],
    joinedAt: "2021-02-18",
  },
];
