"use client";

import React, { forwardRef } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { FormField } from "./FormField";

export interface RadioOption {
  label: string;
  value: string | number;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  options: RadioOption[];
  orientation?: "vertical" | "horizontal";
  containerClassName?: string;
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      register,
      options,
      orientation = "vertical",
      containerClassName,
      name,
      ...props
    },
    ref
  ) => {
    const radioGroupElement = (
      <div
        className={`${
          orientation === "horizontal"
            ? "flex flex-wrap gap-4"
            : "space-y-3"
        }`}
        role="radiogroup"
      >
        {options.map((option, index) => (
          <div key={option.value} className="flex items-start gap-3">
            <input
              ref={index === 0 ? ref : undefined}
              type="radio"
              id={`${name}-${option.value}`}
              value={option.value}
              disabled={option.disabled}
              className="w-4 h-4 mt-1 text-primary bg-background border-border focus:ring-2 focus:ring-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={error ? "true" : "false"}
              {...register}
              {...props}
              name={name}
            />
            <div className="flex-1">
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-sm font-medium text-foreground cursor-pointer select-none"
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </div>
        ))}
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
          {radioGroupElement}
        </FormField>
      );
    }

    return radioGroupElement;
  }
);

RadioGroup.displayName = "RadioGroup";
