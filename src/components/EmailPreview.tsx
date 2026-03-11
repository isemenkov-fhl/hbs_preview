'use client';

import React, { useEffect, useRef } from 'react';

interface EmailPreviewProps {
  content: string;
}

export function EmailPreview({ content }: EmailPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();
      }
    }
  }, [content]);

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Email Client Header (Gmail-style) */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            S
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">Sender Name</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">sender@example.com</div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <span>to me</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title="Email Preview"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
