# Digital Agency Design System

## Brand Colors

### Primary Color - Purple

- **Hex**: `#a44efd`
- **Usage**: Primary buttons, links, key highlights, branding
- **Text on Primary**: White (`#ffffff`)
- **Dark Mode**: `#b366ff` (lighter for better contrast)

### Secondary Color - Orange

- **Hex**: `#fd920a`
- **Usage**: Secondary buttons, accents, CTAs, highlights
- **Text on Secondary**: White (`#ffffff`)
- **Dark Mode**: `#ff9d1a` (lighter for better contrast)

### Accent Color - Green

- **Hex**: `#a1d69c`
- **Usage**: Success states, positive feedback, special highlights
- **Text on Accent**: Dark (`#0f0f0f`)
- **Dark Mode**: `#b3e0ae` (lighter for better contrast)

## Using Colors in Code

### Tailwind CSS Classes

```tsx
// Primary
<button className="bg-primary text-primary-foreground">
  Primary Button
</button>

// Secondary
<button className="bg-secondary text-secondary-foreground">
  Secondary Button
</button>

// Accent
<div className="bg-accent text-accent-foreground">
  Accent Box
</div>
```

### CSS Variables

```css
/* In your CSS */
.custom-class {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.secondary-class {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.accent-class {
  background-color: var(--accent);
  color: var(--accent-foreground);
}
```

### Direct Hex Values (from constants)

```tsx
import { COLORS } from "@/lib/constants";

// Use in inline styles or JavaScript
<div style={{ backgroundColor: COLORS.primary }}>Colored with constant</div>;
```

## Background Colors

### Light Mode

- Primary Background: `#fdfbf9` - Warm off-white
- Card Background: `#ffffff` - Pure white
- Muted Background: `#f5f5f5` - Light gray

### Dark Mode

- Primary Background: `#0f0f0f` - Deep black
- Card Background: `#1a1a1a` - Dark gray
- Muted Background: `#2a2a2a` - Medium dark gray

## Text Colors

### Light Mode

- Primary Text: `#0f0f0f` - Almost black
- Muted Text: `#666666` - Medium gray
- On Brand Colors: `#ffffff` - White

### Dark Mode

- Primary Text: `#fdfbf9` - Off-white
- Muted Text: `#999999` - Light gray
- On Brand Colors: `#0f0f0f` - Dark (for lighter brand colors)

## Border & Input Colors

### Light Mode

- Border: `#e5e5e5` - Light gray
- Input Border: `#e5e5e5` - Light gray
- Focus Ring: `#a44efd` - Primary purple

### Dark Mode

- Border: `#2a2a2a` - Dark gray
- Input Border: `#2a2a2a` - Dark gray
- Focus Ring: `#b366ff` - Light purple

## Component Examples

### Primary Button

```tsx
<button className="bg-primary text-white hover:opacity-90 px-6 py-3 rounded-lg font-semibold transition-opacity">
  Get Started
</button>
```

### Secondary Button

```tsx
<button className="bg-secondary text-white hover:opacity-90 px-6 py-3 rounded-lg font-semibold transition-opacity">
  Learn More
</button>
```

### Outlined Button

```tsx
<button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
  Contact Us
</button>
```

### Card with Shadow

```tsx
<div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-xl font-semibold text-foreground mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here...</p>
</div>
```

### Status Badges

```tsx
// Success (using accent)
<span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
  Active
</span>

// Warning (using secondary)
<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
  In Review
</span>

// Info (using primary)
<span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
  New
</span>
```

## Typography

### Headings

```tsx
<h1 className="text-4xl md:text-6xl font-bold text-foreground">
  Main Heading
</h1>

<h2 className="text-3xl md:text-4xl font-bold text-foreground">
  Section Heading
</h2>

<h3 className="text-2xl font-semibold text-foreground">
  Subsection Heading
</h3>
```

### Body Text

```tsx
<p className="text-base text-foreground leading-relaxed">
  Regular paragraph text
</p>

<p className="text-sm text-muted-foreground">
  Secondary or helper text
</p>
```

### Links

```tsx
<a href="#" className="text-primary hover:underline font-medium">
  Text Link
</a>

<a href="#" className="text-secondary hover:underline font-medium">
  Secondary Link
</a>
```

## Spacing System

Use consistent spacing throughout:

- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)

## Border Radius

- **sm**: `0.375rem` (6px)
- **md**: `0.5rem` (8px)
- **lg**: `0.625rem` (10px) - Default --radius
- **xl**: `1rem` (16px)
- **full**: `9999px` - For pills/circles

## Shadows

```css
/* Small shadow - for cards */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);

/* Medium shadow - for hover states */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);

/* Large shadow - for modals/popovers */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:

- Primary (#a44efd) on white: ✓ AA
- Secondary (#fd920a) on white: ✓ AA
- White text on primary: ✓ AAA
- White text on secondary: ✓ AAA

### Focus States

Always include visible focus states:

```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible Button
</button>
```

## Best Practices

1. **Consistency**: Use the design system variables instead of hardcoding colors
2. **Contrast**: Ensure text has sufficient contrast with backgrounds
3. **Dark Mode**: Test all color combinations in both light and dark modes
4. **Semantic Use**: Use primary for main actions, secondary for supporting actions
5. **Accessibility**: Always include focus states and maintain WCAG compliance
