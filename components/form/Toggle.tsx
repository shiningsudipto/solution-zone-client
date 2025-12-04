"use client";

import React, { forwardRef } from "react";
import { FieldError, Controller, Control } from "react-hook-form";
import { FormField } from "./FormField";

export interface ToggleProps {
  label?: string;
  error?: FieldError;
  helperText?: string;
  description?: string;
  containerClassName?: string;
  control: Control<any>;
  name: string;
  disabled?: boolean;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      label,
      error,
      helperText,
      description,
      containerClassName,
      control,
      name,
      disabled,
    },
    ref
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const isOn = !!field.value;

          const toggleElement = (
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                {label && (
                  <div className="text-sm font-medium text-foreground">
                    {label}
                  </div>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
              <button
                ref={ref}
                type="button"
                role="switch"
                aria-checked={isOn}
                disabled={disabled}
                onClick={() => field.onChange(!isOn)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isOn ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isOn ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          );

          if (helperText || error) {
            return (
              <FormField
                error={error}
                helperText={helperText}
                className={containerClassName}
              >
                {toggleElement}
              </FormField>
            );
          }

          return <div className={containerClassName}>{toggleElement}</div>;
        }}
      />
    );
  }
);

Toggle.displayName = "Toggle";
