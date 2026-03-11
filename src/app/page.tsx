'use client';

import React, { useState, useEffect } from 'react';
import { EmailPreview } from '@/components/EmailPreview';
import { SMSPreview } from '@/components/SMSPreview';
import { ViberPreview } from '@/components/ViberPreview';
import { PushPreview } from '@/components/PushPreview';
import { detectTemplateType, extractHandlebarsVariables, generateDummyData, TemplateType } from '@/lib/templateUtils';
import { renderTemplate } from '@/lib/handlebarsRenderer';

export default function Home() {
  const [templateContent, setTemplateContent] = useState('');
  const [templateType, setTemplateType] = useState<TemplateType>('email');
  const [pushTitle, setPushTitle] = useState('');
  const [renderedContent, setRenderedContent] = useState('');

  useEffect(() => {
    // Auto-detect template type when content changes
    if (templateContent) {
      const detectedType = detectTemplateType(templateContent);
      setTemplateType(detectedType);
    }
  }, [templateContent]);

  useEffect(() => {
    // Render template with dummy data
    if (templateContent) {
      const variables = extractHandlebarsVariables(templateContent);
      const dummyData = generateDummyData(variables);
      const rendered = renderTemplate(templateContent, dummyData);
      setRenderedContent(rendered);
    } else {
      setRenderedContent('');
    }
  }, [templateContent]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 shadow-sm">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Handlebars Template Preview
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Preview email, SMS, push notifications, and Viber messages in real-time
            </p>
          </div>

          {/* Sample Templates */}
          <div className="flex gap-2">
            <button
              onClick={() => handleLoadSample('email')}
              className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
            >
              Load Email Sample
            </button>
            <button
              onClick={() => handleLoadSample('sms')}
              className="px-3 py-1.5 text-sm bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md transition-colors"
            >
              Load SMS Sample
            </button>
            <button
              onClick={() => handleLoadSample('push')}
              className="px-3 py-1.5 text-sm bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md transition-colors"
            >
              Load Push Sample
            </button>
            <button
              onClick={() => handleLoadSample('viber')}
              className="px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md transition-colors"
            >
              Load Viber Sample
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1800px] mx-auto w-full gap-6 p-6">
        {/* Editor Panel */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[calc(100vh-180px)]">
            {/* Editor Header */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Template Editor</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Paste your Handlebars template below
              </p>
            </div>

            {/* Push Title Field (conditional) */}
            {templateType === 'push' && (
              <div className="bg-amber-50 dark:bg-amber-900/20 px-4 py-3 border-b border-amber-200 dark:border-amber-800">
                <label className="block text-xs font-semibold text-amber-900 dark:text-amber-300 mb-2">
                  Push Notification Title
                </label>
                <input
                  type="text"
                  value={pushTitle}
                  onChange={(e) => setPushTitle(e.target.value)}
                  placeholder="Enter notification title..."
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 rounded-md text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {/* Textarea */}
            <textarea
              value={templateContent}
              onChange={(e) => setTemplateContent(e.target.value)}
              placeholder="Paste your Handlebars template here..."
              className="flex-1 w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none placeholder-gray-400 dark:placeholder-gray-500"
              spellCheck={false}
            />

            {/* Footer Info */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                {templateContent.length} characters
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                Detected: <span className="font-semibold text-gray-700 dark:text-gray-300 uppercase">{templateType}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[calc(100vh-180px)]">
            {/* Preview Header with Tabs */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
              </div>

              {/* Type Switcher Tabs */}
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => setTemplateType('email')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                    templateType === 'email'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setTemplateType('sms')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                    templateType === 'sms'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  SMS
                </button>
                <button
                  onClick={() => {
                    setTemplateType('push');
                    if (!pushTitle) setPushTitle('New Notification');
                  }}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                    templateType === 'push'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Push
                </button>
                <button
                  onClick={() => setTemplateType('viber')}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                    templateType === 'viber'
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Viber
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-950 p-6">
              {!renderedContent ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Paste a template to see the preview
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {templateType === 'email' && <EmailPreview content={renderedContent} />}
                  {templateType === 'sms' && <SMSPreview content={renderedContent} />}
                  {templateType === 'push' && <PushPreview title={renderedPushTitle} content={renderedContent} />}
                  {templateType === 'viber' && <ViberPreview content={renderedContent} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
