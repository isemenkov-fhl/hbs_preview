'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EmailComponent } from '@/types/email-builder';
import ComponentWrapper from './ComponentWrapper';

interface BuilderCanvasProps {
  components: EmailComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onDeleteComponent: (id: string) => void;
  onReorderComponents: (startIndex: number, endIndex: number) => void;
}

export default function BuilderCanvas({
  components,
  selectedComponentId,
  onSelectComponent,
  onDeleteComponent,
  onReorderComponents,
}: BuilderCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Email Preview Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border-primary)] overflow-hidden">
        {/* Email Header */}
        <div className="bg-[var(--color-background-tertiary)] px-6 py-4 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
              Email Canvas
            </h2>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {components.length} {components.length === 1 ? 'component' : 'components'}
            </span>
          </div>
        </div>

        {/* Canvas Drop Zone */}
        <div
          ref={setNodeRef}
          className={`min-h-[600px] p-6 transition-colors ${
            isOver ? 'bg-[var(--brand-coral-50)]' : 'bg-white'
          }`}
        >
          {/* Email Container (600px standard width) */}
          <div className="w-[600px] mx-auto bg-white">
            {components.length === 0 ? (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-[var(--color-border-secondary)] mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  <p className="text-[var(--color-text-secondary)] text-sm">
                    Drag components here to start building your email
                  </p>
                </div>
              </div>
            ) : (
              <SortableContext
                items={components.map(c => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {components.map((component) => (
                  <ComponentWrapper
                    key={component.id}
                    component={component}
                    isSelected={component.id === selectedComponentId}
                    onSelect={() => onSelectComponent(component.id)}
                    onDelete={() => onDeleteComponent(component.id)}
                  />
                ))}
              </SortableContext>
            )}
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-[var(--color-text-secondary)]">
          Email width: 600px (standard for email clients)
        </p>
      </div>
    </div>
  );
}
