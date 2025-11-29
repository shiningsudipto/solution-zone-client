import { useRef, useState } from "react";

interface UseImageUploadOptions {
  onUpload: (url: string) => void;
  onError?: (error: string) => void;
}

export function useImageUpload({ onUpload, onError }: UseImageUploadOptions) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      const errorMsg = "Please select an image file";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      const errorMsg = "Image size should be less than 5MB";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setError(null);
    setUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        setPreviewUrl(base64);
        setUploading(false);
        // In a real app, you would upload to a server here
        // For now, we'll use base64 directly
        onUpload(base64);
      }
    };
    reader.onerror = () => {
      const errorMsg = "Failed to read file";
      setError(errorMsg);
      setUploading(false);
      onError?.(errorMsg);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    previewUrl,
    fileInputRef,
    handleFileChange,
    handleRemove,
    uploading,
    error,
  };
}
