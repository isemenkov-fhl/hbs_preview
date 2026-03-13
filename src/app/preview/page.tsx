'use client';

import React, { useState, useEffect } from 'react';
import { EmailPreview } from '@/components/EmailPreview';
import { SMSPreview } from '@/components/SMSPreview';
import { ViberPreview } from '@/components/ViberPreview';
import { PushPreview } from '@/components/PushPreview';
import ValidationPanel from '@/components/ValidationPanel';
import { detectTemplateType, extractHandlebarsVariables, generateDummyData, TemplateType } from '@/lib/templateUtils';
import { renderTemplate } from '@/lib/handlebarsRenderer';
import { validateTemplate, ValidationResult } from '@/lib/templateValidator';

// List of available example templates
const EXAMPLE_TEMPLATES = [
  { name: 'Email - Personal Info Update', file: 'email.hbs', type: 'email' as TemplateType },
  { name: 'Email - Alternative 1', file: 'email copy.hbs', type: 'email' as TemplateType },
  { name: 'Email - Alternative 2', file: 'email copy 2.hbs', type: 'email' as TemplateType },
  { name: 'SMS - Basic', file: 'sms.hbs', type: 'sms' as TemplateType },
  { name: 'SMS - Virtual Card', file: 'sms copy.hbs', type: 'sms' as TemplateType },
  { name: 'SMS - Credit Approval', file: 'sms copy 2.hbs', type: 'sms' as TemplateType },
  { name: 'Push - Notification', file: 'push.hbs', type: 'push' as TemplateType },
];

export default function Home() {
  const [templateContent, setTemplateContent] = useState('');
  const [templateType, setTemplateType] = useState<TemplateType>('email');
  const [pushTitle, setPushTitle] = useState('');
  const [renderedContent, setRenderedContent] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const [dummyData, setDummyData] = useState<Record<string, any>>({});
  const [reloadKey, setReloadKey] = useState(0);
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [previousContent, setPreviousContent] = useState('');

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Resizable panels state
  const [editorWidth, setEditorWidth] = useState(40); // percentage
  const [isDragging, setIsDragging] = useState(false);

  // Apply theme on mount and when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Auto-detect template type only when pasting into empty editor
    // Don't auto-detect if user is actively editing (previousContent was not empty)
    if (templateContent && previousContent === '') {
      const detectedType = detectTemplateType(templateContent);
      setTemplateType(detectedType);
    }
    setPreviousContent(templateContent);
  }, [templateContent]);

  useEffect(() => {
    // Extract variables and generate dummy data only for new variables
    if (templateContent) {
      const extractedVars = extractHandlebarsVariables(templateContent);
      setVariables(extractedVars);

      // Only generate data for new variables, preserve user-edited values
      setDummyData(prevData => {
        const generatedData = generateDummyData(extractedVars);
        const newData: Record<string, any> = {};

        extractedVars.forEach(variable => {
          // Keep existing value if it exists, otherwise use generated value
          newData[variable] = prevData[variable] !== undefined ? prevData[variable] : generatedData[variable];
        });

        return newData;
      });
    } else {
      setVariables([]);
      setDummyData({});
    }
  }, [templateContent]);

  // Re-render when template content or dummy data changes
  useEffect(() => {
    if (templateContent) {
      // Render even if there are no variables (empty dummyData is fine)
      const rendered = renderTemplate(templateContent, dummyData);
      setRenderedContent(rendered);
    } else {
      setRenderedContent('');
    }
  }, [templateContent, dummyData]);

  // Validate template when content or type changes
  useEffect(() => {
    if (templateContent) {
      // Use a debounce to avoid validating on every keystroke
      const timeoutId = setTimeout(() => {
        // Validation excludes variable placeholders from SMS length count
        const results = validateTemplate(templateContent, templateType);
        setValidationResults(results);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setValidationResults([]);
    }
  }, [templateContent, templateType]);

  // Also render push title if in push mode
  const renderedPushTitle = React.useMemo(() => {
    if (templateType === 'push' && pushTitle) {
      const variables = extractHandlebarsVariables(pushTitle);
      const dummyData = generateDummyData(variables);
      return renderTemplate(pushTitle, dummyData);
    }
    return pushTitle;
  }, [templateType, pushTitle]);

  const handleLoadSample = async (type: TemplateType) => {
    try {
      const response = await fetch(`/sample_${type}.hbs`);
      const text = await response.text();
      setTemplateContent(text);
      setTemplateType(type);

      if (type === 'push') {
        setPushTitle('New Notification');
      } else {
        setPushTitle('');
      }
    } catch (error) {
      console.error('Error loading sample:', error);
    }
  };

  const handleLoadExample = async (filename: string, type: TemplateType) => {
    try {
      const response = await fetch(`/examples/${filename}`);
      const text = await response.text();
      setTemplateContent(text);
      setTemplateType(type);

      if (type === 'push') {
        setPushTitle('New Notification');
      } else {
        setPushTitle('');
      }
    } catch (error) {
      console.error('Error loading example:', error);
    }
  };

  const handleReloadPreview = () => {
    setReloadKey(prev => prev + 1);
  };

  const handleVariableChange = (variable: string, value: string) => {
    setDummyData(prevData => ({
      ...prevData,
      [variable]: value
    }));
  };

  const handleResetVariable = (variable: string) => {
    const generatedData = generateDummyData([variable]);
    setDummyData(prevData => ({
      ...prevData,
      [variable]: generatedData[variable]
    }));
  };

  const handleResetAllVariables = () => {
    const generatedData = generateDummyData(variables);
    setDummyData(generatedData);
  };

  const handleClearEditor = () => {
    setTemplateContent('');
    setPushTitle('');
    setPreviousContent(''); // Reset so auto-detection works on next paste
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setTemplateContent(content);

        // Auto-detect type from content
        const detectedType = detectTemplateType(content);
        setTemplateType(detectedType);

        if (detectedType === 'push' && !pushTitle) {
          setPushTitle('New Notification');
        }
      };
      reader.readAsText(file);
    }
    // Reset the input so the same file can be selected again
    event.target.value = '';
  };

  // Resizable panel handlers
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const containerWidth = window.innerWidth;
      const newWidth = (e.clientX / containerWidth) * 100;

      // Constrain between 20% and 70%
      const constrainedWidth = Math.min(Math.max(newWidth, 20), 70);
      setEditorWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-[var(--color-background-secondary)] flex flex-col">
      {/* Sub-header with example templates */}
      <div className="bg-[var(--color-background-primary)] border-b border-[var(--color-border-primary)] px-6 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Preview email, SMS, push notifications, and Viber messages in real-time
          </p>

          {/* Example Templates Dropdown */}
          <select
            onChange={(e) => {
              const example = EXAMPLE_TEMPLATES.find(t => t.file === e.target.value);
              if (example) {
                handleLoadExample(example.file, example.type);
              }
            }}
            className="px-4 py-2 text-sm bg-white border border-[var(--color-border-primary)] text-[var(--color-text-primary)] rounded-md hover:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] transition-colors cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Load Example Template</option>
            <optgroup label="Email Templates">
              {EXAMPLE_TEMPLATES.filter(t => t.type === 'email').map(template => (
                <option key={template.file} value={template.file}>
                  {template.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="SMS Templates">
              {EXAMPLE_TEMPLATES.filter(t => t.type === 'sms').map(template => (
                <option key={template.file} value={template.file}>
                  {template.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Push Templates">
              {EXAMPLE_TEMPLATES.filter(t => t.type === 'push').map(template => (
                <option key={template.file} value={template.file}>
                  {template.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col xl:flex-row max-w-[2000px] mx-auto w-full gap-0 p-6">
        {/* Editor Panel */}
        <div
          className="w-full flex flex-col gap-4 pr-2"
          style={{ width: `${editorWidth}%` }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border-primary)] overflow-hidden flex flex-col h-[calc(100vh-180px)]">
            {/* Editor Header */}
            <div className="bg-[var(--color-background-tertiary)] px-6 py-4 border-b border-[var(--color-border-primary)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Template Editor</h2>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Paste your Handlebars template below
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* File Upload Button */}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept=".hbs,.handlebars,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[var(--brand-coral-50)] hover:bg-[var(--brand-coral-100)] text-[var(--brand-coral-700)] rounded-lg transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload File
                    </div>
                  </label>
                  {/* Clear Button */}
                  <button
                    onClick={handleClearEditor}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[var(--message-red-50)] hover:bg-[var(--message-red-100)] text-[var(--message-red-700)] rounded-lg transition-colors"
                    title="Clear editor"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Push Title Field (conditional) */}
            {templateType === 'push' && (
              <div className="bg-[var(--color-background-tertiary)] px-6 py-4 border-b border-[var(--color-border-primary)]">
                <label className="block text-xs font-bold text-[var(--color-text-primary)] mb-2">
                  Push Notification Title
                </label>
                <input
                  type="text"
                  value={pushTitle}
                  onChange={(e) => setPushTitle(e.target.value)}
                  placeholder="Enter notification title..."
                  className="w-full px-3 py-2 bg-white border border-[var(--color-border-primary)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-colors"
                />
              </div>
            )}

            {/* Textarea */}
            <textarea
              value={templateContent}
              onChange={(e) => setTemplateContent(e.target.value)}
              placeholder="Paste your Handlebars template here..."
              className="flex-1 w-full px-4 py-3 bg-white text-[var(--color-text-primary)] font-mono text-sm resize-none focus:outline-none placeholder-[var(--color-text-tertiary)]"
              spellCheck={false}
            />

            {/* Footer Info */}
            <div className="bg-[var(--color-background-tertiary)] px-4 py-2 border-t border-[var(--color-border-primary)] flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-secondary)]">
                {templateContent.length} characters
              </span>
            </div>
          </div>

          {/* Validation Panel */}
          {validationResults.length > 0 && (
            <ValidationPanel results={validationResults} />
          )}
        </div>

        {/* Draggable Divider */}
        <div
          className="hidden xl:flex items-center justify-center cursor-col-resize group hover:bg-[var(--color-background-tertiary)] transition-colors"
          style={{ width: '12px' }}
          onMouseDown={handleMouseDown}
        >
          <div className="w-1 h-16 bg-[var(--color-border-secondary)] rounded-full group-hover:bg-[var(--color-brand-primary)] transition-colors" />
        </div>

        {/* Variables Panel - Separate Column */}
        {variables.length > 0 && (
          <div
            className="w-full flex flex-col gap-4 px-2"
            style={{ width: '25%' }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border-primary)] overflow-hidden flex flex-col h-[calc(100vh-180px)]">
              <div className="bg-[var(--color-brand-primary)] px-6 py-4 border-b border-[var(--color-border-primary)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Template Variables
                    </h3>
                    <p className="text-xs text-white/90 mt-1">
                      {variables.length} {variables.length === 1 ? 'parameter' : 'parameters'} detected
                    </p>
                  </div>
                  <button
                    onClick={handleResetAllVariables}
                    className="px-4 py-2 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                    title="Reset all to defaults"
                  >
                    Reset All
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {variables.map((variable) => (
                    <div
                      key={variable}
                      className="p-4 bg-[var(--brand-coral-50)] rounded-lg border border-[var(--brand-coral-100)] hover:border-[var(--color-brand-primary)] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)] flex-shrink-0"></div>
                          <code className="text-sm font-mono font-semibold text-[var(--color-text-primary)] truncate">
                            {variable}
                          </code>
                        </div>
                        <button
                          onClick={() => handleResetVariable(variable)}
                          className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition-colors flex-shrink-0"
                          title="Reset to default"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>
                      <div className="pl-4 border-l-2 border-[var(--color-border-primary)]">
                        <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-2 block">Value:</label>
                        <input
                          type="text"
                          value={String(dummyData[variable])}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                          className="w-full px-3 py-2 text-sm text-[var(--color-text-primary)] bg-white border border-[var(--color-border-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-colors"
                          placeholder="Enter value..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Panel */}
        <div
          className="w-full flex flex-col gap-4 pl-2"
          style={{
            width: variables.length > 0
              ? `calc(${100 - editorWidth - 25}% - 12px)`
              : `calc(${100 - editorWidth}% - 12px)`
          }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-[var(--color-border-primary)] overflow-hidden flex flex-col h-[calc(100vh-180px)]">
            {/* Preview Header with Tabs */}
            <div className="bg-[var(--color-background-tertiary)] px-6 py-4 border-b border-[var(--color-border-primary)]">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Preview</h2>
                <button
                  onClick={handleReloadPreview}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[var(--color-border-primary)] hover:bg-[var(--color-border-secondary)] text-[var(--color-text-primary)] rounded-lg transition-colors"
                  title="Reload preview"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reload
                </button>
              </div>

              {/* Type Switcher Tabs */}
              <div className="flex gap-2 bg-[var(--color-border-primary)] p-1 rounded-lg">
                <button
                  onClick={() => setTemplateType('email')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    templateType === 'email'
                      ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setTemplateType('sms')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    templateType === 'sms'
                      ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  SMS
                </button>
                <button
                  onClick={() => {
                    setTemplateType('push');
                    if (!pushTitle) setPushTitle('New Notification');
                  }}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    templateType === 'push'
                      ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  Push
                </button>
                <button
                  onClick={() => setTemplateType('viber')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    templateType === 'viber'
                      ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  Viber
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-[var(--color-background-secondary)] p-6" key={reloadKey}>
              {!renderedContent ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-[var(--color-border-secondary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-[var(--color-text-secondary)] text-sm">
                      Paste a template to see the preview
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {templateType === 'email' && <EmailPreview content={renderedContent} key={`email-${reloadKey}`} />}
                  {templateType === 'sms' && <SMSPreview content={renderedContent} key={`sms-${reloadKey}`} />}
                  {templateType === 'push' && <PushPreview title={renderedPushTitle} content={renderedContent} key={`push-${reloadKey}`} />}
                  {templateType === 'viber' && <ViberPreview content={renderedContent} key={`viber-${reloadKey}`} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
