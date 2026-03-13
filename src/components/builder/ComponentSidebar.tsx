'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface ComponentButtonProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  category: string;
}

function DraggableComponent({ id, label, icon }: ComponentButtonProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 p-3 bg-white rounded-lg border border-[var(--color-border-primary)] cursor-grab hover:border-[var(--color-brand-primary)] hover:shadow-md transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="text-[var(--color-brand-primary)] flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm font-medium text-[var(--color-text-primary)]">
        {label}
      </span>
    </div>
  );
}

export default function ComponentSidebar() {
  const contentComponents: ComponentButtonProps[] = [
    {
      id: 'logo',
      label: 'Logo',
      category: 'content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'image',
      label: 'Image',
      category: 'content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'heading',
      label: 'Heading',
      category: 'content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
    },
    {
      id: 'textblock',
      label: 'Text Block',
      category: 'content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
    },
    {
      id: 'button',
      label: 'Button',
      category: 'content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      id: 'qrcode',
      label: 'QR Code',
      category: 'content',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
    },
  ];

  const layoutComponents: ComponentButtonProps[] = [
    {
      id: 'spacer',
      label: 'Spacer',
      category: 'layout',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      ),
    },
    {
      id: 'divider',
      label: 'Divider',
      category: 'layout',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      ),
    },
  ];

  const compositeComponents: ComponentButtonProps[] = [
    {
      id: 'socialfooter',
      label: 'Social Footer',
      category: 'composite',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'faqblock',
      label: 'FAQ Block',
      category: 'composite',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">
          Components
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Drag components to the canvas
        </p>
      </div>

      {/* Content Components */}
      <div>
        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          Content
        </h4>
        <div className="space-y-2">
          {contentComponents.map((component) => (
            <DraggableComponent key={component.id} {...component} />
          ))}
        </div>
      </div>

      {/* Layout Components */}
      <div>
        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          Layout
        </h4>
        <div className="space-y-2">
          {layoutComponents.map((component) => (
            <DraggableComponent key={component.id} {...component} />
          ))}
        </div>
      </div>

      {/* Composite Components */}
      <div>
        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          Composite
        </h4>
        <div className="space-y-2">
          {compositeComponents.map((component) => (
            <DraggableComponent key={component.id} {...component} />
          ))}
        </div>
      </div>

      {/* Templates Section */}
      <div className="pt-4 border-t border-[var(--color-border-primary)]">
        <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
          Templates
        </h4>
        <div className="space-y-2">
          <button className="w-full text-left p-3 bg-white rounded-lg border border-[var(--color-border-primary)] hover:border-[var(--color-brand-primary)] hover:shadow-md transition-all">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              Blank Template
            </span>
          </button>
          <button className="w-full text-left p-3 bg-white rounded-lg border border-[var(--color-border-primary)] hover:border-[var(--color-brand-primary)] hover:shadow-md transition-all">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              Payment Reminder
            </span>
          </button>
          <button className="w-full text-left p-3 bg-white rounded-lg border border-[var(--color-border-primary)] hover:border-[var(--color-brand-primary)] hover:shadow-md transition-all">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              Birthday Email
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
