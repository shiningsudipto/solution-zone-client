"use client";

import React, { forwardRef, useState } from "react";
import { FieldError, Controller, Control } from "react-hook-form";
import { FormField } from "./FormField";
import { X, Check } from "lucide-react";

export interface MultiSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  options: MultiSelectOption[];
  placeholder?: string;
  containerClassName?: string;
  control: Control<any>;
  name: string;
  maxItems?: number;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      options,
      placeholder = "Select items...",
      containerClassName,
      control,
      name,
      maxItems,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues = Array.isArray(field.value) ? field.value : [];

          const handleToggle = (optionValue: string | number) => {
            const newValues = selectedValues.includes(optionValue)
              ? selectedValues.filter((v) => v !== optionValue)
              : maxItems && selectedValues.length >= maxItems
              ? selectedValues
              : [...selectedValues, optionValue];
            field.onChange(newValues);
          };

          const handleRemove = (optionValue: string | number) => {
            field.onChange(selectedValues.filter((v) => v !== optionValue));
          };

          const getOptionLabel = (value: string | number) => {
            return options.find((opt) => opt.value === value)?.label || value;
          };

          const multiSelectElement = (
            <div ref={ref} className="relative">
              {/* Selected Items Display */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full min-h-[48px] px-4 py-2 border ${
                  error ? "border-red-500" : "border-border"
                } rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer`}
              >
                {selectedValues.length === 0 ? (
                  <span className="text-muted-foreground py-1.5 block">
                    {placeholder}
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedValues.map((value) => (
                      <span
                        key={value}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        {getOptionLabel(value)}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(value);
                          }}
                          className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Options */}
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute z-20 w-full mt-2 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      const isDisabled =
                        option.disabled ||
                        (!isSelected &&
                          maxItems &&
                          selectedValues.length >= maxItems);

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            if (!isDisabled) {
                              handleToggle(option.value);
                            }
                          }}
                          disabled={isDisabled}
                          className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                            isSelected
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          } ${
                            isDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          <span className="text-sm">{option.label}</span>
                          {isSelected && <Check className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {maxItems && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedValues.length}/{maxItems} items selected
                </p>
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
                {multiSelectElement}
              </FormField>
            );
          }

          return multiSelectElement;
        }}
      />
    );
  }
);

MultiSelect.displayName = "MultiSelect";
