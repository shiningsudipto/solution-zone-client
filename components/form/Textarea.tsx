"use client";

import React, { forwardRef } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { FormField } from "./FormField";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  showCharCount?: boolean;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      register,
      rows = 4,
      maxLength,
      showCharCount,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCharCount) {
        setCharCount(e.target.value.length);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const textareaElement = (
      <div className="relative">
        <textarea
          ref={ref}
          rows={rows}
          maxLength={maxLength}
          className={`w-full px-4 py-3 border ${
            error ? "border-red-500" : "border-border"
          } rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:bg-muted disabled:cursor-not-allowed`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...register}
          {...props}
          onChange={handleChange}
        />
        {showCharCount && maxLength && (
          <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
            {charCount}/{maxLength}
          </div>
        )}
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
          {textareaElement}
        </FormField>
      );
    }

    return textareaElement;
  }
);

Textarea.displayName = "Textarea";
