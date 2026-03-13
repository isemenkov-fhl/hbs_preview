'use client';

import React from 'react';
import { EmailTemplate } from '@/types/email-builder';

interface BuilderToolbarProps {
  onSave: () => void;
  onExport: () => void;
  template: EmailTemplate;
}

export default function BuilderToolbar({
  onSave,
  onExport,
  template,
}: BuilderToolbarProps) {
  const handlePreview = () => {
    // Open preview in new window
    window.open('/preview', '_blank');
  };

  return (
    <div className="bg-[var(--color-background-primary)] border-t border-[var(--color-border-primary)] px-6 py-4 shadow-lg">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        {/* Left: Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--message-green-500)] rounded-full"></div>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {template.components.length} components
            </span>
          </div>
          <div className="text-xs text-[var(--color-text-tertiary)]">
            Last updated: {new Date(template.metadata.updatedAt).toLocaleTimeString()}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] bg-white border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-brand-primary)] hover:shadow-md transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Preview
          </button>

          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] bg-white border border-[var(--color-border-primary)] rounded-lg hover:border-[var(--color-brand-primary)] hover:shadow-md transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export HTML
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[var(--color-brand-primary)] rounded-lg hover:bg-[var(--color-brand-hover)] shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}
