'use client';

import React from 'react';
import { EmailComponent } from '@/types/email-builder';

interface PropertiesPanelProps {
  component: EmailComponent | undefined;
  onUpdateComponent: (id: string, props: any) => void;
  onDeleteComponent: (id: string) => void;
}

export default function PropertiesPanel({
  component,
  onUpdateComponent,
  onDeleteComponent,
}: PropertiesPanelProps) {
  if (!component) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <svg
            className="w-12 h-12 mx-auto text-[var(--color-border-secondary)] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Select a component to edit its properties
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
            Properties
          </h3>
          <button
            onClick={() => onDeleteComponent(component.id)}
            className="p-1.5 text-[var(--message-red-500)] hover:bg-[var(--message-red-50)] rounded transition-colors"
            title="Delete component"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <div className="inline-block px-3 py-1 bg-[var(--brand-coral-50)] text-[var(--brand-coral-700)] text-xs font-medium rounded-full">
          {component.type}
        </div>
      </div>

      {/* Properties Form */}
      <div className="space-y-4">
        {/* Placeholder for now - will be replaced with component-specific forms */}
        <div className="p-4 bg-[var(--color-background-secondary)] rounded-lg border border-[var(--color-border-primary)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            Component-specific properties will appear here.
          </p>

          {/* Example form fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                Component ID
              </label>
              <input
                type="text"
                value={component.id}
                disabled
                className="w-full px-3 py-2 text-sm bg-white border border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-secondary)] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1">
                Type
              </label>
              <input
                type="text"
                value={component.type}
                disabled
                className="w-full px-3 py-2 text-sm bg-white border border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-secondary)] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-[var(--message-blue-100)] border border-[var(--message-blue-200)] rounded-lg">
          <div className="flex gap-2">
            <svg
              className="w-5 h-5 text-[var(--message-blue-600)] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-xs font-semibold text-[var(--message-blue-700)] mb-1">
                Property Editor Coming Soon
              </p>
              <p className="text-xs text-[var(--message-blue-600)]">
                Component-specific property editors will be added in the next phase of development.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[var(--color-border-primary)]">
          <button
            onClick={() => onDeleteComponent(component.id)}
            className="w-full px-4 py-2 bg-[var(--message-red-50)] hover:bg-[var(--message-red-100)] text-[var(--message-red-700)] text-sm font-medium rounded-lg transition-colors"
          >
            Delete Component
          </button>
        </div>
      </div>
    </div>
  );
}
