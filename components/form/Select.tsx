"use client";

import React, { forwardRef } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { FormField } from "./FormField";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      register,
      options,
      placeholder = "Select an option",
      containerClassName,
      ...props
    },
    ref
  ) => {
    const selectElement = (
      <div className="relative">
        <select
          ref={ref}
          className={`w-full px-4 py-3 pr-12 border ${
            error ? "border-red-500" : "border-border"
          } rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer disabled:bg-muted disabled:cursor-not-allowed`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...register}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    );

    if (label || helperText || error) {
      return (
        <FormField
          label={label}
          error={error}
          required={required}
          helperText={helperText}
          className={containerClassName}
        >
          {selectElement}
        </FormField>
      );
    }

    return selectElement;
  }
);

Select.displayName = "Select";
