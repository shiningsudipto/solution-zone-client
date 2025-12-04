import React from "react";
import { FieldError } from "react-hook-form";

export interface FormFieldProps {
  label?: string;
  error?: FieldError;
  required?: boolean;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  error,
  required,
  helperText,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="text-red-500">⚠</span>
          {error.message}
        </p>
      )}
      {!error && helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
