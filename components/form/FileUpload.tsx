"use client";

import React, { forwardRef, useState } from "react";
import { FieldError, Controller, Control } from "react-hook-form";
import { FormField } from "./FormField";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";

export interface FileUploadProps {
  label?: string;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
  control: Control<any>;
  name: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  showPreview?: boolean;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      containerClassName,
      control,
      name,
      accept,
      multiple = false,
      maxSize = 5,
      maxFiles = 1,
      showPreview = true,
    },
    ref
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    const isImageFile = (file: File) => {
      return file.type.startsWith("image/");
    };

    const validateFile = (file: File) => {
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return `File size exceeds ${maxSize}MB`;
      }
      return null;
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const files: File[] = Array.isArray(field.value)
            ? field.value
            : field.value
            ? [field.value]
            : [];

          const handleFiles = (newFiles: FileList | null) => {
            if (!newFiles) return;

            const fileArray = Array.from(newFiles);
            const validFiles: File[] = [];
            const errors: string[] = [];

            for (const file of fileArray) {
              const error = validateFile(file);
              if (error) {
                errors.push(`${file.name}: ${error}`);
              } else {
                validFiles.push(file);
              }
            }

            if (errors.length > 0) {
              alert(errors.join("\n"));
            }

            if (validFiles.length > 0) {
              const totalFiles = multiple
                ? [...files, ...validFiles].slice(0, maxFiles)
                : [validFiles[0]];
              field.onChange(multiple ? totalFiles : totalFiles[0]);
            }
          };

          const handleDrag = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.type === "dragenter" || e.type === "dragover") {
              setDragActive(true);
            } else if (e.type === "dragleave") {
              setDragActive(false);
            }
          };

          const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            handleFiles(e.dataTransfer.files);
          };

          const handleRemove = (index: number) => {
            const newFiles = files.filter((_, i) => i !== index);
            field.onChange(multiple ? newFiles : null);
          };

          const fileUploadElement = (
            <div className="space-y-3">
              {/* Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : error
                    ? "border-red-500 bg-red-50"
                    : "border-border hover:border-primary hover:bg-muted/50"
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                />
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  {accept || "Any file type"} (Max {maxSize}MB)
                  {multiple && ` - Up to ${maxFiles} files`}
                </p>
              </div>

              {/* File Previews */}
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                    >
                      {showPreview && isImageFile(file) ? (
                        <div className="w-12 h-12 rounded bg-background flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-background flex items-center justify-center flex-shrink-0">
                          {isImageFile(file) ? (
                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                          ) : (
                            <File className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="p-1 hover:bg-background rounded transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
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
                {fileUploadElement}
              </FormField>
            );
          }

          return fileUploadElement;
        }}
      />
    );
  }
);

FileUpload.displayName = "FileUpload";
