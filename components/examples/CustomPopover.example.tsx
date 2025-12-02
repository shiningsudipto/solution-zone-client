"use client";

import { useState } from "react";
import { CustomPopover } from "../CustomPopover";

/**
 * CustomPopover Component Examples
 *
 * This file demonstrates various ways to use the CustomPopover component
 */

export function CustomPopoverExamples() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 space-y-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">CustomPopover Examples</h1>

      {/* Example 1: Basic Popover */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Basic Popover</h2>
        <p className="text-muted-foreground">
          Simple popover with title and content, uncontrolled state.
        </p>
        <CustomPopover
          trigger={
            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
              Open Basic Popover
            </button>
          }
          title="Basic Popover"
        >
          <p className="text-sm">
            This is a simple popover with just a title and content.
          </p>
        </CustomPopover>
      </section>

      {/* Example 2: Controlled Popover */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Controlled Popover</h2>
        <p className="text-muted-foreground">
          Popover with controlled open state (managed by parent component).
        </p>
        <div className="flex gap-4">
          <CustomPopover
            trigger={
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
                Controlled Popover
              </button>
            }
            title="Controlled State"
            open={open}
            onOpenChange={setOpen}
            footer={
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
              >
                Close
              </button>
            }
          >
            <p className="text-sm">
              This popover's state is controlled by the parent component.
            </p>
          </CustomPopover>

          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted"
          >
            Toggle from Outside
          </button>
        </div>
      </section>
    </div>
  );
}
