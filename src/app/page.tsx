'use client';

import React, { useState, useEffect } from 'react';
import { EmailPreview } from '@/components/EmailPreview';
import { SMSPreview } from '@/components/SMSPreview';
import { ViberPreview } from '@/components/ViberPreview';
import { PushPreview } from '@/components/PushPreview';
import { detectTemplateType, extractHandlebarsVariables, generateDummyData, TemplateType } from '@/lib/templateUtils';
import { renderTemplate } from '@/lib/handlebarsRenderer';

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

  useEffect(() => {
    // Auto-detect template type when content changes
    if (templateContent) {
      const detectedType = detectTemplateType(templateContent);
      setTemplateType(detectedType);
    }
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
    if (templateContent && Object.keys(dummyData).length > 0) {
      const rendered = renderTemplate(templateContent, dummyData);
      setRenderedContent(rendered);
    } else {
      setRenderedContent('');
    }
  }, [templateContent, dummyData]);

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

          {/* Example Templates Dropdown */}
          <div className="flex gap-3">
            <select
              onChange={(e) => {
                const example = EXAMPLE_TEMPLATES.find(t => t.file === e.target.value);
                if (example) {
                  handleLoadExample(example.file, example.type);
                }
              }}
              className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
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

            {/* Quick Access Buttons */}
            <div className="flex gap-2 border-l border-gray-300 dark:border-gray-600 pl-3">
              <button
                onClick={() => handleLoadSample('email')}
                className="px-3 py-1.5 text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
                title="Load simple email sample"
              >
                Email
              </button>
              <button
                onClick={() => handleLoadSample('sms')}
                className="px-3 py-1.5 text-sm bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md transition-colors"
                title="Load simple SMS sample"
              >
                SMS
              </button>
              <button
                onClick={() => handleLoadSample('push')}
                className="px-3 py-1.5 text-sm bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md transition-colors"
                title="Load simple push sample"
              >
                Push
              </button>
              <button
                onClick={() => handleLoadSample('viber')}
                className="px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md transition-colors"
                title="Load simple Viber sample"
              >
                Viber
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col xl:flex-row max-w-[2000px] mx-auto w-full gap-6 p-6">
        {/* Editor Panel */}
        <div className="w-full xl:w-[40%] flex flex-col gap-4">
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

        {/* Variables Panel - Separate Column */}
        {variables.length > 0 && (
          <div className="w-full xl:w-[25%] flex flex-col gap-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[calc(100vh-180px)]">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Template Variables
                    </h3>
                    <p className="text-xs text-blue-50 mt-1">
                      {variables.length} {variables.length === 1 ? 'parameter' : 'parameters'} detected
                    </p>
                  </div>
                  <button
                    onClick={handleResetAllVariables}
                    className="px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-md transition-colors"
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
                      className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                          <code className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400 truncate">
                            {`{{${variable}}}`}
                          </code>
                        </div>
                        <button
                          onClick={() => handleResetVariable(variable)}
                          className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex-shrink-0"
                          title="Reset to default"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>
                      <div className="pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Value:</label>
                        <input
                          type="text"
                          value={String(dummyData[variable])}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className={`w-full ${variables.length > 0 ? 'xl:w-[35%]' : 'xl:w-[60%]'} flex flex-col gap-4`}>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col h-[calc(100vh-180px)]">
            {/* Preview Header with Tabs */}
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Preview</h2>
                <button
                  onClick={handleReloadPreview}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
                  title="Reload preview"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reload
                </button>
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
            <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-950 p-6" key={reloadKey}>
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
