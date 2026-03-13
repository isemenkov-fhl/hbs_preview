'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import ComponentSidebar from '@/components/builder/ComponentSidebar';
import BuilderCanvas from '@/components/builder/BuilderCanvas';
import PropertiesPanel from '@/components/builder/PropertiesPanel';
import BuilderToolbar from '@/components/builder/BuilderToolbar';
import { EmailComponent, EmailTemplate } from '@/types/email-builder';

export default function EmailBuilder() {
  const [template, setTemplate] = useState<EmailTemplate>({
    id: 'new-template',
    name: 'Untitled Template',
    components: [],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const selectedComponent = template.components.find(c => c.id === selectedComponentId);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // Handle adding new component from sidebar
    if (active.id.toString().startsWith('new-')) {
      const componentType = active.id.toString().replace('new-', '');
      addNewComponent(componentType);
    }

    setActiveId(null);
  };

  const addNewComponent = (type: string) => {
    // This will be implemented when we create the component registry
    console.log('Adding new component:', type);
  };

  const updateComponent = (id: string, props: any) => {
    setTemplate(prev => ({
      ...prev,
      components: prev.components.map(comp =>
        comp.id === id ? { ...comp, props } : comp
      ),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const deleteComponent = (id: string) => {
    setTemplate(prev => ({
      ...prev,
      components: prev.components.filter(comp => comp.id !== id),
      metadata: {
        ...prev.metadata,
        updatedAt: new Date().toISOString(),
      },
    }));

    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  const reorderComponents = (startIndex: number, endIndex: number) => {
    setTemplate(prev => {
      const newComponents = Array.from(prev.components);
      const [removed] = newComponents.splice(startIndex, 1);
      newComponents.splice(endIndex, 0, removed);

      return {
        ...prev,
        components: newComponents,
        metadata: {
          ...prev.metadata,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  const handleSaveTemplate = () => {
    // Save to local storage for now
    const savedTemplates = JSON.parse(localStorage.getItem('emailTemplates') || '[]');
    const existingIndex = savedTemplates.findIndex((t: EmailTemplate) => t.id === template.id);

    if (existingIndex >= 0) {
      savedTemplates[existingIndex] = template;
    } else {
      savedTemplates.push(template);
    }

    localStorage.setItem('emailTemplates', JSON.stringify(savedTemplates));
    alert('Template saved successfully!');
  };

  const handleExportHTML = () => {
    // This will be implemented when we create the HTML renderer
    console.log('Exporting HTML:', template);
    alert('Export functionality coming soon!');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-secondary)] flex flex-col">
      {/* Sub-header */}
      <div className="bg-[var(--color-background-primary)] border-b border-[var(--color-border-primary)] px-6 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div>
            <input
              type="text"
              value={template.name}
              onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
              className="text-lg font-semibold text-[var(--color-text-primary)] bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] rounded px-2 py-1"
              placeholder="Template Name"
            />
            <p className="text-sm text-[var(--color-text-secondary)] mt-1 px-2">
              Drag components from the left to build your email template
            </p>
          </div>
        </div>
      </div>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Main 3-Column Layout */}
        <div className="flex-1 flex max-w-[2000px] mx-auto w-full">
          {/* Left Sidebar - Component Palette */}
          <div className="w-64 bg-[var(--color-background-secondary)] border-r border-[var(--color-border-primary)] overflow-y-auto">
            <ComponentSidebar />
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 overflow-y-auto p-6">
            <BuilderCanvas
              components={template.components}
              selectedComponentId={selectedComponentId}
              onSelectComponent={setSelectedComponentId}
              onDeleteComponent={deleteComponent}
              onReorderComponents={reorderComponents}
            />
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-80 bg-[var(--color-background-secondary)] border-l border-[var(--color-border-primary)] overflow-y-auto">
            <PropertiesPanel
              component={selectedComponent}
              onUpdateComponent={updateComponent}
              onDeleteComponent={deleteComponent}
            />
          </div>
        </div>

        {/* Toolbar */}
        <BuilderToolbar
          onSave={handleSaveTemplate}
          onExport={handleExportHTML}
          template={template}
        />

        <DragOverlay>
          {activeId ? (
            <div className="bg-white p-4 rounded-lg shadow-lg border border-[var(--color-brand-primary)]">
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
