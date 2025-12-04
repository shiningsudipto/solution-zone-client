"use client";

import React, { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FormField } from "./FormField";
import { FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  icon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      register,
      type = "text",
      icon,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const inputElement = (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`w-full ${icon ? "pl-12" : "pl-4"} ${
            isPassword ? "pr-12" : "pr-4"
          } py-3 border ${
            error ? "border-red-500" : "border-border"
          } rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-muted disabled:cursor-not-allowed`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...register}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
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
          {inputElement}
        </FormField>
      );
    }

    return inputElement;
  }
);

Input.displayName = "Input";
