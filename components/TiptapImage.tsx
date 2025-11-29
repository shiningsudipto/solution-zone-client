"use client";
// @ts-nocheck
/* eslint-disable */
import Image from "@tiptap/extension-image";
import {
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Maximize,
  MoreVertical,
  Trash,
  Edit,
  ImageIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export const ImageExtension = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: null,
      },
      align: {
        default: "center",
      },
      caption: {
        default: "",
      },
      aspectRatio: {
        default: null,
      },
    };
  },

  addNodeView: () => {
    return ReactNodeViewRenderer(TiptapImage);
  },
});

function TiptapImage(props: NodeViewProps) {
  const { node, editor, selected, deleteNode, updateAttributes } = props;
  const imageRef = useRef<HTMLImageElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resizing, setResizing] = useState(false);
  const [resizingPosition, setResizingPosition] = useState<"left" | "right">(
    "left"
  );
  const [resizeInitialWidth, setResizeInitialWidth] = useState(0);
  const [resizeInitialMouseX, setResizeInitialMouseX] = useState(0);
  const [editingCaption, setEditingCaption] = useState(false);
  const [caption, setCaption] = useState(node.attrs.caption || "");
  const [openedMore, setOpenedMore] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState(node.attrs.alt || "");

  function handleResizingPosition({
    e,
    position,
  }: {
    e: React.MouseEvent<HTMLDivElement, MouseEvent>;
    position: "left" | "right";
  }) {
    startResize(e);
    setResizingPosition(position);
  }

  function startResize(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setResizing(true);
    setResizeInitialMouseX(event.clientX);
    if (imageRef.current) {
      setResizeInitialWidth(imageRef.current.offsetWidth);
    }
  }

  function resize(event: MouseEvent) {
    if (!resizing) return;

    let dx = event.clientX - resizeInitialMouseX;
    if (resizingPosition === "left") {
      dx = resizeInitialMouseX - event.clientX;
    }

    const newWidth = Math.max(resizeInitialWidth + dx, 150);
    const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? 0;

    if (newWidth < parentWidth) {
      updateAttributes({
        width: newWidth,
      });
    }
  }

  function endResize() {
    setResizing(false);
    setResizeInitialMouseX(0);
    setResizeInitialWidth(0);
  }

  function handleTouchStart(
    event: React.TouchEvent,
    position: "left" | "right"
  ) {
    event.preventDefault();
    setResizing(true);
    setResizingPosition(position);
    setResizeInitialMouseX(event.touches[0]?.clientX ?? 0);
    if (imageRef.current) {
      setResizeInitialWidth(imageRef.current.offsetWidth);
    }
  }

  function handleTouchMove(event: TouchEvent) {
    if (!resizing) return;

    let dx = (event.touches[0]?.clientX ?? resizeInitialMouseX) - resizeInitialMouseX;
    if (resizingPosition === "left") {
      dx = resizeInitialMouseX - (event.touches[0]?.clientX ?? resizeInitialMouseX);
    }

    const newWidth = Math.max(resizeInitialWidth + dx, 150);
    const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? 0;

    if (newWidth < parentWidth) {
      updateAttributes({
        width: newWidth,
      });
    }
  }

  function handleTouchEnd() {
    setResizing(false);
    setResizeInitialMouseX(0);
    setResizeInitialWidth(0);
  }

  function handleCaptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newCaption = e.target.value;
    setCaption(newCaption);
  }

  function handleCaptionBlur() {
    updateAttributes({ caption });
    setEditingCaption(false);
  }

  function handleCaptionKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleCaptionBlur();
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        updateAttributes({
          src: base64,
          alt: altText || file.name,
        });
        setOpenedMore(false);
      }
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      updateAttributes({
        src: imageUrl,
        alt: altText,
      });
      setImageUrl("");
      setAltText("");
      setOpenedMore(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", endResize);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", endResize);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [resizing, resizeInitialMouseX, resizeInitialWidth]);

  return (
    <NodeViewWrapper
      ref={nodeRef}
      className={cn(
        "relative flex flex-col rounded-md border-2 border-transparent transition-all duration-200",
        selected ? "border-primary" : "",
        node.attrs.align === "left" && "left-0 -translate-x-0",
        node.attrs.align === "center" && "left-1/2 -translate-x-1/2",
        node.attrs.align === "right" && "left-full -translate-x-full"
      )}
      style={{ width: node.attrs.width }}
    >
      <div
        className={cn(
          "group relative flex flex-col rounded-md",
          resizing && ""
        )}
      >
        <figure className="relative m-0">
          <img
            ref={imageRef}
            src={node.attrs.src}
            alt={node.attrs.alt}
            title={node.attrs.title}
            className="rounded-lg transition-shadow duration-200 hover:shadow-lg"
            onLoad={(e) => {
              const img = e.currentTarget;
              const aspectRatio = img.naturalWidth / img.naturalHeight;
              updateAttributes({ aspectRatio });
            }}
          />
          {editor?.isEditable && (
            <>
              <div
                className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-start p-2"
                style={{ left: 0 }}
                onMouseDown={(event) => {
                  handleResizingPosition({ e: event, position: "left" });
                }}
                onTouchStart={(event) => handleTouchStart(event, "left")}
              >
                <div className="z-20 h-[70px] w-1 rounded-xl border bg-[rgba(0,0,0,0.65)] opacity-0 transition-all group-hover:opacity-100" />
              </div>
              <div
                className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-end p-2"
                style={{ right: 0 }}
                onMouseDown={(event) => {
                  handleResizingPosition({ e: event, position: "right" });
                }}
                onTouchStart={(event) => handleTouchStart(event, "right")}
              >
                <div className="z-20 h-[70px] w-1 rounded-xl border bg-[rgba(0,0,0,0.65)] opacity-0 transition-all group-hover:opacity-100" />
              </div>
            </>
          )}
        </figure>

        {editingCaption ? (
          <input
            value={caption}
            onChange={handleCaptionChange}
            onBlur={handleCaptionBlur}
            onKeyDown={handleCaptionKeyDown}
            className="mt-2 px-2 py-1 text-center text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary rounded border border-border bg-background"
            placeholder="Add a caption..."
            autoFocus
          />
        ) : (
          <div
            className="mt-2 cursor-text text-center text-sm text-muted-foreground"
            onClick={() => editor?.isEditable && setEditingCaption(true)}
          >
            {caption || "Click to add caption..."}
          </div>
        )}

        {editor?.isEditable && (
          <div
            className={cn(
              "absolute right-4 top-4 flex items-center gap-1 rounded-md border bg-background/80 p-1 opacity-0 backdrop-blur transition-opacity",
              !resizing && "group-hover:opacity-100",
              openedMore && "opacity-100"
            )}
          >
            <button
              className={cn(
                "p-2 rounded hover:bg-muted transition-colors",
                node.attrs.align === "left" && "bg-muted"
              )}
              onClick={() => updateAttributes({ align: "left" })}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              className={cn(
                "p-2 rounded hover:bg-muted transition-colors",
                node.attrs.align === "center" && "bg-muted"
              )}
              onClick={() => updateAttributes({ align: "center" })}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              className={cn(
                "p-2 rounded hover:bg-muted transition-colors",
                node.attrs.align === "right" && "bg-muted"
              )}
              onClick={() => updateAttributes({ align: "right" })}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="relative">
              <button
                className="p-2 rounded hover:bg-muted transition-colors"
                onClick={() => setOpenedMore(!openedMore)}
                title="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {openedMore && (
                <div className="absolute right-0 top-full mt-1 w-72 rounded-md border bg-background p-4 shadow-lg z-30">
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs font-medium">Upload Image</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="replace-image-upload"
                      />
                      <label
                        htmlFor="replace-image-upload"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed p-4 hover:bg-muted"
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-sm">Choose Image</span>
                      </label>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium">Or use URL</p>
                      <div className="space-y-2">
                        <input
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="Enter image URL..."
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          onClick={handleImageUrlSubmit}
                          className="w-full px-3 py-2 bg-primary text-white rounded-md text-sm hover:opacity-90 disabled:opacity-50"
                          disabled={!imageUrl}
                        >
                          Replace with URL
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium">Alt Text</p>
                      <input
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                        placeholder="Alt text (optional)"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="pt-2 border-t border-border space-y-2">
                      <button
                        onClick={() => setEditingCaption(true)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                      >
                        <Edit className="w-4 h-4" /> Edit Caption
                      </button>
                      <button
                        onClick={() => {
                          const aspectRatio = node.attrs.aspectRatio;
                          if (aspectRatio) {
                            const parentWidth =
                              nodeRef.current?.parentElement?.offsetWidth ?? 0;
                            updateAttributes({
                              width: parentWidth,
                              height: parentWidth / aspectRatio,
                            });
                          }
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                      >
                        <Maximize className="w-4 h-4" /> Full Width
                      </button>
                      <button
                        onClick={() => {
                          deleteNode();
                          setOpenedMore(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-100 rounded-md transition-colors text-red-600"
                      >
                        <Trash className="w-4 h-4" /> Delete Image
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
