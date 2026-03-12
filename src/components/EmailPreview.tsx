'use client';

import React, { useEffect, useRef, useState } from 'react';

interface EmailPreviewProps {
  content: string;
}

export function EmailPreview({ content }: EmailPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(600);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();

        // Resize iframe to fit content
        const resizeIframe = () => {
          if (iframeDoc.body) {
            const height = Math.max(
              iframeDoc.body.scrollHeight,
              iframeDoc.documentElement?.scrollHeight || 0,
              600 // minimum height
            );
            setIframeHeight(height);
          }
        };

        // Wait for content to load and resize
        setTimeout(resizeIframe, 100);

        // Also resize on iframe load events
        if (iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.addEventListener('load', resizeIframe);
          iframeRef.current.contentWindow.addEventListener('resize', resizeIframe);
        }
      }
    }
  }, [content]);

  return (
    <div className="w-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Email Client Header (Gmail-style) */}
      <div className="bg-white border-b border-[var(--color-border-primary)] px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--brand-coral-600)] to-[var(--brand-coral-400)] rounded-full flex items-center justify-center text-white font-semibold">
            S
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm text-[var(--color-text-primary)]">Salmon</div>
            <div className="text-xs text-[var(--color-text-secondary)]">no-reply@salmon.ph</div>
          </div>
          <div className="text-xs text-[var(--color-text-secondary)]">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1">
          <span>to me</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Email Content */}
      <div className="bg-[var(--color-background-secondary)]">
        <iframe
          ref={iframeRef}
          className="w-full border-0"
          style={{ height: `${iframeHeight}px` }}
          title="Email Preview"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}
