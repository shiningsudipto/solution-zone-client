"use client";

import React, { forwardRef } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "className"> {
  label: string;
  error?: FieldError;
  helperText?: string;
  register?: UseFormRegisterReturn;
  containerClassName?: string;
  description?: string;
}

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      label,
      error,
      helperText,
      register,
      containerClassName,
      description,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-2 ${containerClassName || ""}`}>
        <div className="flex items-start gap-3">
          <Checkbox
            id={props.id}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...register}
            {...props}
          />
          <div className="space-y-1 flex-1">
            <label
              htmlFor={props.id}
              className="text-sm font-medium text-foreground cursor-pointer select-none"
            >
              {label}
            </label>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1 ml-7">
            <span className="text-red-500">⚠</span>
            {error.message}
          </p>
        )}
        {!error && helperText && (
          <p className="text-sm text-muted-foreground ml-7">{helperText}</p>
        )}
      </div>
    );
  }
);

CheckboxField.displayName = "CheckboxField";
