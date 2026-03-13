'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { EmailComponent } from '@/types/email-builder';

interface ComponentWrapperProps {
  component: EmailComponent;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export default function ComponentWrapper({
  component,
  isSelected,
  onSelect,
  onDelete,
}: ComponentWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderPlaceholder = () => {
    const placeholders: Record<string, string> = {
      spacer: 'Spacer',
      logo: 'Logo Component',
      image: 'Image Component',
      heading: 'Heading Component',
      textblock: 'Text Block Component',
      button: 'Button Component',
      qrcode: 'QR Code Component',
      divider: 'Divider Component',
      socialfooter: 'Social Footer Component',
      faqblock: 'FAQ Block Component',
    };

    return (
      <div className="p-6 bg-[var(--color-background-secondary)] border-2 border-dashed border-[var(--color-border-primary)] rounded-lg text-center">
        <p className="text-sm font-medium text-[var(--color-text-secondary)]">
          {placeholders[component.type] || component.type}
        </p>
        <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
          Select to edit properties
        </p>
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group transition-all ${isDragging ? 'opacity-50' : ''}`}
    >
      {/* Selection Border */}
      <div
        onClick={onSelect}
        className={`relative cursor-pointer transition-all ${
          isSelected
            ? 'ring-2 ring-[var(--color-brand-primary)] rounded-lg'
            : 'hover:ring-2 hover:ring-[var(--color-border-secondary)] rounded-lg'
        }`}
      >
        {/* Drag Handle - appears on hover or when selected */}
        <div
          {...attributes}
          {...listeners}
          className={`absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/5 to-transparent flex items-center justify-center cursor-grab active:cursor-grabbing transition-opacity ${
            isSelected || isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-[var(--color-text-secondary)] rounded-full"></div>
            <div className="w-1 h-1 bg-[var(--color-text-secondary)] rounded-full"></div>
            <div className="w-1 h-1 bg-[var(--color-text-secondary)] rounded-full"></div>
          </div>
        </div>

        {/* Component Content */}
        <div className="p-2">
          {renderPlaceholder()}
        </div>

        {/* Delete Button - appears when selected */}
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 p-1.5 bg-[var(--message-red-500)] hover:bg-[var(--message-red-700)] text-white rounded-md shadow-lg transition-colors z-10"
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
        )}
      </div>

      {/* Component Label - appears on hover */}
      <div
        className={`absolute -top-6 left-2 px-2 py-1 bg-[var(--color-text-primary)] text-white text-xs rounded shadow-lg transition-opacity pointer-events-none ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {component.type}
      </div>
    </div>
  );
}
