import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "srv-001",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "Create stunning, user-centered designs that convert visitors into customers.",
    longDescription: `<p>Our UI/UX design services focus on creating beautiful, intuitive interfaces that provide exceptional user experiences. We combine aesthetic excellence with usability principles to deliver designs that not only look great but also drive results.</p>
    <p>From user research to prototyping and testing, we ensure every design decision is backed by data and aligned with your business goals.</p>`,
    heroImage: "/services/ui-ux.jpg",
    features: [
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design & Branding",
      "Usability Testing",
      "Design System Creation",
      "Responsive Design",
    ],
    offerings: [
      {
        title: "User Research",
        description:
          "Deep dive into your users' needs, behaviors, and pain points through comprehensive research.",
      },
      {
        title: "Interface Design",
        description:
          "Create stunning visual interfaces that align with your brand and delight users.",
      },
      {
        title: "Prototyping",
        description:
          "Build interactive prototypes to validate ideas before development begins.",
      },
    ],
    order: 1,
    createdAt: "2024-01-15",
    seo: {
      title: "Professional UI/UX Design Services | Digital Agency",
      description:
        "Transform your digital products with our expert UI/UX design services. User-centered, conversion-focused design.",
      keywords: [
        "UI design",
        "UX design",
        "user interface",
        "user experience",
        "web design",
      ],
    },
  },
  {
    id: "srv-002",
    slug: "web-development",
    title: "Web Development",
    shortDescription:
      "Build fast, scalable, and secure web applications using modern technologies.",
    longDescription: `<p>Our web development team specializes in creating high-performance web applications that scale with your business. We use cutting-edge technologies and best practices to deliver solutions that are fast, secure, and maintainable.</p>
    <p>Whether you need a simple landing page or a complex web application, we have the expertise to bring your vision to life.</p>`,
    heroImage: "/services/web-dev.jpg",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "Performance Optimization",
      "SEO Implementation",
      "API Development",
      "Progressive Web Apps",
    ],
    offerings: [
      {
        title: "Frontend Development",
        description:
          "Create responsive, interactive user interfaces using React, Next.js, and modern frameworks.",
      },
      {
        title: "Backend Development",
        description:
          "Build robust server-side applications with Node.js, databases, and cloud infrastructure.",
      },
      {
        title: "Full Stack Solutions",
        description:
          "End-to-end development services covering both frontend and backend needs.",
      },
    ],
    order: 2,
    createdAt: "2024-01-15",
    seo: {
      title: "Web Development Services | Modern Web Apps",
      description:
        "Professional web development services using React, Next.js, and latest technologies.",
      keywords: [
        "web development",
        "React",
        "Next.js",
        "custom websites",
        "web applications",
      ],
    },
  },
  {
    id: "srv-003",
    slug: "app-development",
    title: "App Development",
    shortDescription:
      "Develop native and cross-platform mobile applications that users love.",
    longDescription: `<p>Transform your ideas into powerful mobile applications. Our app development services cover iOS, Android, and cross-platform solutions using the latest technologies and frameworks.</p>
    <p>We focus on performance, user experience, and scalability to ensure your app succeeds in the competitive mobile market.</p>`,
    heroImage: "/services/app-dev.jpg",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Apps",
      "App Store Optimization",
      "Push Notifications",
      "Offline Functionality",
    ],
    offerings: [
      {
        title: "Native Development",
        description:
          "Build high-performance native apps for iOS and Android platforms.",
      },
      {
        title: "Cross-Platform",
        description:
          "Develop apps that work seamlessly across multiple platforms with React Native or Flutter.",
      },
      {
        title: "App Maintenance",
        description:
          "Ongoing support, updates, and optimization for your mobile applications.",
      },
    ],
    order: 3,
    createdAt: "2024-01-15",
    seo: {
      title: "Mobile App Development Services | iOS & Android",
      description:
        "Create stunning mobile apps for iOS and Android. Native and cross-platform development.",
      keywords: [
        "app development",
        "mobile apps",
        "iOS",
        "Android",
        "React Native",
        "Flutter",
      ],
    },
  },
  {
    id: "srv-004",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Grow your business with data-driven marketing strategies and campaigns.",
    longDescription: `<p>Our digital marketing services help you reach and engage your target audience effectively. We combine creativity with analytics to deliver campaigns that drive real business results.</p>
    <p>From SEO to social media marketing, we cover all aspects of digital marketing to help your business grow.</p>`,
    heroImage: "/services/marketing.jpg",
    features: [
      "SEO & Content Marketing",
      "Social Media Marketing",
      "PPC Advertising",
      "Email Marketing",
      "Analytics & Reporting",
      "Brand Strategy",
    ],
    offerings: [
      {
        title: "Search Engine Optimization",
        description:
          "Improve your visibility in search results and drive organic traffic to your site.",
      },
      {
        title: "Social Media",
        description:
          "Build and engage your community across all major social platforms.",
      },
      {
        title: "Paid Advertising",
        description:
          "Maximize ROI with targeted paid advertising campaigns on Google, Facebook, and more.",
      },
    ],
    order: 4,
    createdAt: "2024-01-15",
    seo: {
      title: "Digital Marketing Services | SEO, PPC, Social Media",
      description:
        "Grow your business with expert digital marketing. SEO, social media, PPC, and more.",
      keywords: [
        "digital marketing",
        "SEO",
        "social media marketing",
        "PPC",
        "content marketing",
      ],
    },
  },
  {
    id: "srv-005",
    slug: "business-consultation",
    title: "Business Consultation",
    shortDescription:
      "Strategic guidance to help your business thrive in the digital age.",
    longDescription: `<p>Our business consultation services help organizations navigate digital transformation and achieve their strategic goals. We provide expert guidance on technology adoption, process optimization, and growth strategies.</p>
    <p>Partner with us to unlock your business potential and stay ahead in today's competitive landscape.</p>`,
    heroImage: "/services/consultation.jpg",
    features: [
      "Digital Transformation",
      "Technology Strategy",
      "Process Optimization",
      "Market Analysis",
      "Growth Strategy",
      "Change Management",
    ],
    offerings: [
      {
        title: "Strategy Development",
        description:
          "Create comprehensive digital strategies aligned with your business objectives.",
      },
      {
        title: "Implementation Support",
        description:
          "Guide your team through technology adoption and process changes.",
      },
      {
        title: "Performance Analysis",
        description:
          "Measure and optimize your digital initiatives for maximum impact.",
      },
    ],
    order: 5,
    createdAt: "2024-01-15",
    seo: {
      title: "Business Consultation Services | Digital Transformation",
      description:
        "Expert business consultation for digital transformation and growth strategy.",
      keywords: [
        "business consultation",
        "digital transformation",
        "strategy",
        "business growth",
      ],
    },
  },
];
