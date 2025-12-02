"use client";

/**
 * EXAMPLE USAGE FILE - This demonstrates how to use CustomModal
 * You can delete this file after understanding the usage patterns
 */

import { useState } from "react";
import { CustomModal } from "../CustomModal";

export function CustomModalExamples() {
  const [simpleModalOpen, setSimpleModalOpen] = useState(false);
  const [withFooterModalOpen, setWithFooterModalOpen] = useState(false);

  return (
    <div className="space-y-4 p-8">
      <h2 className="text-2xl font-bold mb-4">CustomModal Examples</h2>

      {/* Example 1: Simple Modal */}
      <div>
        <button
          onClick={() => setSimpleModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
        >
          Open Simple Modal
        </button>

        <CustomModal
          isOpen={simpleModalOpen}
          onClose={() => setSimpleModalOpen(false)}
          title="Simple Modal"
          description="This is a basic modal with just content"
          size="md"
        >
          <p className="text-foreground">
            This is the modal content. You can put any React components here.
          </p>
        </CustomModal>
      </div>
      {/* Example 2: Modal with Footer Actions */}
      <div>
        <button
          onClick={() => setWithFooterModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
        >
          Open Modal with Footer
        </button>

        <CustomModal
          isOpen={withFooterModalOpen}
          onClose={() => setWithFooterModalOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to proceed?"
          size="sm"
          footer={
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setWithFooterModalOpen(false)}
                className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle confirm action
                  console.log("Confirmed!");
                  setWithFooterModalOpen(false);
                }}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                Confirm
              </button>
            </div>
          }
        >
          <p className="text-foreground">
            This action cannot be undone. Please confirm that you want to
            continue.
          </p>
        </CustomModal>
      </div>
    </div>
  );
}
