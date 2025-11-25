# Service Pages - Component-Based Architecture

## Overview

Service pages now use a modular, component-based architecture where each section is a separate, reusable component.

## Component Structure

### Service Components (`/components/services/`)

1. **ServiceHero** - Hero section with breadcrumb, title, description, and CTAs
2. **ServiceDescription** - Detailed service description with HTML content
3. **ServiceFeatures** - Grid of features with checkmarks
4. **ServiceProcess** - Step-by-step process display with numbered cards
5. **ServiceBenefits** - Key benefits with icons
6. **ServiceTools** - Tools & technologies grid with icons
7. **ServiceCaseStudies** - Related case studies section
8. **ServiceCTA** - Call-to-action section at the bottom

### How Each Service Page Works

Each service page (`/app/services/[service-name]/page.tsx`) is composed of these individual components:

```tsx
export default function ServicePage() {
  const service = services.find((s) => s.slug === "service-slug");
  const tools = [...]; // Service-specific tools
  const faqTopics = [...]; // Service-specific FAQ topics

  return (
    <div className="min-h-screen">
      <ServiceHero service={service} />
      <ServiceDescription service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess steps={PROCESS_STEPS.design} />
      <ServiceBenefits service={service} />
      <ServiceTools tools={tools} />
      <ServiceCaseStudies />
      <FAQSection limit={6} topics={faqTopics} />
      <ServiceCTA serviceTitle={service.title} />
    </div>
  );
}
```

## Service Pages

### 1. UI/UX Design (`/services/ui-ux-design`)

- **Process**: Design process (4 steps)
- **Tools**: Figma, Adobe XD, Sketch, InVision, Principle, Maze
- **FAQ Topics**: Process, Services, Technology

### 2. Web Development (`/services/web-development`)

- **Process**: Development process (4 steps)
- **Tools**: React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL
- **FAQ Topics**: Technology, Process, Services

### 3. App Development (`/services/app-development`)

- **Process**: Development process (4 steps)
- **Tools**: React Native, Flutter, Swift, Kotlin, Firebase, App Store
- **FAQ Topics**: Technology, Process, Services

### 4. Digital Marketing (`/services/digital-marketing`)

- **Process**: Marketing process (4 steps)
- **Tools**: Google Analytics, Google Ads, Facebook Ads, SEMrush, Mailchimp, HubSpot
- **FAQ Topics**: Marketing, Services, Process

### 5. Business Consultation (`/services/business-consultation`)

- **Process**: Design process (4 steps)
- **Tools**: Strategic Planning, Data Analysis, Process Mapping, Market Research, ROI Tracking, Change Management
- **FAQ Topics**: Services, Process, About

## Benefits of This Architecture

✅ **Modular** - Each section is a separate component  
✅ **Reusable** - Components can be used across different pages  
✅ **Maintainable** - Easy to update individual sections  
✅ **Customizable** - Each service page can customize which components to include  
✅ **Testable** - Individual components can be tested in isolation  
✅ **Flexible** - Easy to add/remove/reorder sections per service

## Component Props

### ServiceHero

- `service: Service` - Service object with title, description, etc.

### ServiceDescription

- `service: Service` - Service object with longDescription

### ServiceFeatures

- `service: Service` - Service object with features array

### ServiceProcess

- `steps: ProcessStep[]` - Array of process steps (from PROCESS_STEPS constant)

### ServiceBenefits

- `service: Service` - Service object with offerings array

### ServiceTools

- `tools: Tool[]` - Array of tools with name and icon

### ServiceCaseStudies

- No props - Uses blogPosts data internally

### ServiceCTA

- `serviceTitle: string` - Service title for the heading

### FAQSection

- `limit: number` - Number of FAQs to display
- `topics: string[]` - Array of FAQ topics to filter by
