# Form Components

Reusable form field components built with **React Hook Form** for type-safe, accessible forms.

## Features

- ✅ Full React Hook Form integration
- ✅ TypeScript support with proper types
- ✅ Built-in validation error display
- ✅ Accessible with ARIA attributes
- ✅ Consistent styling with Tailwind CSS
- ✅ Optional labels, helper text, and error messages
- ✅ Support for required field indicators

---

## Installation

React Hook Form is already installed:

```bash
npm install react-hook-form
```

---

## Components

### 1. Input

Text, email, password, and other input types with optional icon and password visibility toggle.

**Features:**
- Text, email, password, number, etc.
- Optional icon on the left
- Password toggle button for password fields
- Disabled state support

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { Input } from "@/components/form";
import { Mail, Lock } from "lucide-react";

function MyForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={<Mail className="w-5 h-5" />}
        required
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
        error={errors.email}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        icon={<Lock className="w-5 h-5" />}
        required
        register={register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "At least 8 characters" }
        })}
        error={errors.password}
        helperText="Must be at least 8 characters"
      />
    </form>
  );
}
```

---

### 2. Select

Dropdown/select field with custom styling and chevron icon.

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { Select } from "@/components/form";

function MyForm() {
  const { register, formState: { errors } } = useForm();

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <Select
      label="Status"
      placeholder="Select a status"
      options={statusOptions}
      required
      register={register("status", {
        required: "Status is required"
      })}
      error={errors.status}
    />
  );
}
```

---

### 3. Textarea

Multi-line text input with optional character counter.

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/form";

function MyForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <Textarea
      label="Description"
      placeholder="Enter description..."
      rows={5}
      maxLength={500}
      showCharCount
      required
      register={register("description", {
        required: "Description is required",
        maxLength: { value: 500, message: "Max 500 characters" }
      })}
      error={errors.description}
    />
  );
}
```

---

### 4. CheckboxField

Single checkbox with label and optional description.

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { CheckboxField } from "@/components/form";

function MyForm() {
  const { register, formState: { errors } } = useForm();

  return (
    <CheckboxField
      id="terms"
      label="Accept terms and conditions"
      description="By checking this, you agree to our terms of service"
      register={register("terms", {
        required: "You must accept the terms"
      })}
      error={errors.terms}
    />
  );
}
```

---

### 5. RadioGroup

Group of radio buttons with optional descriptions.

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { RadioGroup } from "@/components/form";

function MyForm() {
  const { register, formState: { errors } } = useForm();

  const paymentOptions = [
    {
      label: "Credit Card",
      value: "card",
      description: "Pay with Visa, Mastercard, or Amex"
    },
    {
      label: "PayPal",
      value: "paypal",
      description: "Fast and secure payment"
    },
    {
      label: "Bank Transfer",
      value: "bank",
      disabled: true
    },
  ];

  return (
    <RadioGroup
      label="Payment Method"
      name="paymentMethod"
      options={paymentOptions}
      orientation="vertical"
      required
      register={register("paymentMethod", {
        required: "Please select a payment method"
      })}
      error={errors.paymentMethod}
    />
  );
}
```

---

### 6. MultiSelect

Select multiple items from a dropdown with tags display.

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { MultiSelect } from "@/components/form";

function MyForm() {
  const { control, formState: { errors } } = useForm({
    defaultValues: { skills: [] }
  });

  const skillOptions = [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "React", value: "react" },
    { label: "Next.js", value: "nextjs" },
    { label: "Node.js", value: "nodejs" },
  ];

  return (
    <MultiSelect
      label="Skills"
      name="skills"
      control={control}
      options={skillOptions}
      placeholder="Select your skills..."
      maxItems={3}
      required
      error={errors.skills}
      helperText="Select up to 3 skills"
    />
  );
}
```

---

### 7. Toggle

Toggle switch for boolean values.

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { Toggle } from "@/components/form";

function MyForm() {
  const { control } = useForm({
    defaultValues: { notifications: false }
  });

  return (
    <Toggle
      label="Email Notifications"
      description="Receive updates about your account via email"
      name="notifications"
      control={control}
    />
  );
}
```

---

### 8. FileUpload

Drag-and-drop file upload with preview support.

**Features:**
- Drag and drop support
- File size validation
- Multiple files support
- Image preview
- Max files limit

**Usage:**

```tsx
import { useForm } from "react-hook-form";
import { FileUpload } from "@/components/form";

function MyForm() {
  const { control, formState: { errors } } = useForm({
    defaultValues: { avatar: null }
  });

  return (
    <>
      {/* Single Image Upload */}
      <FileUpload
        label="Profile Picture"
        name="avatar"
        control={control}
        accept="image/*"
        maxSize={2}
        showPreview
        required
        error={errors.avatar}
        helperText="Upload a profile picture (Max 2MB)"
      />

      {/* Multiple File Upload */}
      <FileUpload
        label="Documents"
        name="documents"
        control={control}
        accept=".pdf,.doc,.docx"
        multiple
        maxFiles={5}
        maxSize={10}
        error={errors.documents}
        helperText="Upload up to 5 documents (Max 10MB each)"
      />
    </>
  );
}
```

---

## Complete Form Example

```tsx
import { useForm } from "react-hook-form";
import {
  Input,
  Select,
  Textarea,
  CheckboxField,
  RadioGroup,
  MultiSelect,
  Toggle,
  FileUpload
} from "@/components/form";
import { Mail, Lock, User } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  bio: string;
  terms: boolean;
  plan: string;
  interests: string[];
  newsletter: boolean;
  avatar: File | null;
}

export function CompleteForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      interests: [],
      newsletter: false,
      avatar: null,
    }
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Text Input */}
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={<User className="w-5 h-5" />}
        required
        register={register("name", {
          required: "Name is required",
          minLength: { value: 2, message: "At least 2 characters" }
        })}
        error={errors.name}
      />

      {/* Email Input */}
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={<Mail className="w-5 h-5" />}
        required
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email"
          }
        })}
        error={errors.email}
      />

      {/* Password Input */}
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="w-5 h-5" />}
        required
        register={register("password", {
          required: "Password is required",
          minLength: { value: 8, message: "At least 8 characters" }
        })}
        error={errors.password}
        helperText="Must be at least 8 characters"
      />

      {/* Select */}
      <Select
        label="Role"
        placeholder="Select your role"
        options={[
          { label: "Developer", value: "dev" },
          { label: "Designer", value: "design" },
          { label: "Manager", value: "manager" },
        ]}
        required
        register={register("role", {
          required: "Role is required"
        })}
        error={errors.role}
      />

      {/* Textarea */}
      <Textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        rows={4}
        maxLength={200}
        showCharCount
        register={register("bio")}
        error={errors.bio}
      />

      {/* Radio Group */}
      <RadioGroup
        label="Subscription Plan"
        name="plan"
        options={[
          { label: "Free", value: "free", description: "$0/month" },
          { label: "Pro", value: "pro", description: "$9.99/month" },
          { label: "Enterprise", value: "enterprise", description: "Custom pricing" },
        ]}
        orientation="vertical"
        required
        register={register("plan", {
          required: "Please select a plan"
        })}
        error={errors.plan}
      />

      {/* MultiSelect */}
      <MultiSelect
        label="Interests"
        name="interests"
        control={control}
        options={[
          { label: "Technology", value: "tech" },
          { label: "Design", value: "design" },
          { label: "Business", value: "business" },
          { label: "Marketing", value: "marketing" },
        ]}
        placeholder="Select your interests..."
        maxItems={3}
      />

      {/* Toggle */}
      <Toggle
        label="Email Newsletter"
        description="Receive weekly updates and tips"
        name="newsletter"
        control={control}
      />

      {/* File Upload */}
      <FileUpload
        label="Profile Picture"
        name="avatar"
        control={control}
        accept="image/*"
        maxSize={2}
        showPreview
      />

      {/* Checkbox */}
      <CheckboxField
        id="terms"
        label="Accept terms and conditions"
        description="By checking this, you agree to our terms"
        required
        register={register("terms", {
          required: "You must accept the terms"
        })}
        error={errors.terms}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

---

## Validation

All components support React Hook Form validation:

```tsx
register("fieldName", {
  required: "This field is required",
  minLength: { value: 5, message: "At least 5 characters" },
  maxLength: { value: 50, message: "Maximum 50 characters" },
  pattern: { value: /regex/, message: "Invalid format" },
  validate: (value) => value !== "admin" || "Username taken"
})
```

---

## Styling

All components use Tailwind CSS with the project's design system:
- Primary color: `#a44efd`
- Border color: `border-border`
- Background: `bg-background`
- Focus ring: `ring-primary`

Components support `containerClassName` prop for custom spacing and layout.

---

## Accessibility

All components include:
- Proper ARIA attributes (`aria-invalid`, `aria-describedby`)
- Associated labels with `htmlFor`
- Error announcements for screen readers
- Keyboard navigation support
- Focus indicators

---

## API Reference

### Common Props

All form components support these common props:

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Field label |
| `error` | `FieldError` | React Hook Form error object |
| `helperText` | `string` | Helper text below field |
| `required` | `boolean` | Show required indicator |
| `containerClassName` | `string` | Custom container classes |

### Component-Specific Props

See individual component sections above for specific props like `register`, `control`, `options`, etc.
