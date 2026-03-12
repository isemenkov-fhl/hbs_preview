import React from 'react';

interface PushPreviewProps {
  title: string;
  content: string;
}

export function PushPreview({ title, content }: PushPreviewProps) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const displayTitle = title || 'App Name';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {/* iOS Device */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">iOS</h3>
        <div className="relative w-full max-w-[340px]">
          {/* iPhone Frame */}
          <div className="bg-black rounded-[3rem] p-2.5 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-3xl z-10"></div>

            {/* Screen - Lock Screen Background */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] overflow-hidden relative" style={{ height: '600px' }}>
              {/* Lock Screen Time */}
              <div className="absolute top-20 left-0 right-0 text-center text-white">
                <div className="text-6xl font-light tracking-tight">9:41</div>
                <div className="text-base font-medium mt-1">Tuesday, March 11</div>
              </div>

              {/* Push Notification */}
              <div className="absolute top-48 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                  <div className="px-3 py-2.5">
                    {/* App Header */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-medium text-gray-600 flex-1 truncate">App Name</span>
                      <span className="text-[11px] text-gray-500 flex-shrink-0">now</span>
                    </div>

                    {/* Notification Title */}
                    <div className="mb-0.5">
                      <p className="text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2">
                        {displayTitle}
                      </p>
                    </div>

                    {/* Notification Body */}
                    <div>
                      <p className="text-[13px] text-gray-900 leading-tight line-clamp-4">
                        {content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom swipe indicator */}
              <div className="absolute bottom-4 left-0 right-0">
                {/* Swipe Indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-32 h-1 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Android Device */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Android</h3>
        <div className="relative w-full max-w-[340px]">
          {/* Android Frame */}
          <div className="bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl">
            {/* Screen - Lock Screen Background */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] overflow-hidden relative" style={{ height: '600px' }}>
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 px-4 py-2 flex justify-between items-center text-white text-xs z-20">
                <span className="font-medium">{currentTime}</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Lock Screen Time */}
              <div className="absolute top-24 left-0 right-0 text-center text-white">
                <div className="text-7xl font-light tracking-tight">9:41</div>
                <div className="text-lg font-normal mt-2">Tue, Mar 11</div>
              </div>

              {/* Push Notification */}
              <div className="absolute top-64 left-4 right-4">
                <div className="bg-[#202124] rounded-lg shadow-2xl overflow-hidden">
                  <div className="px-4 py-2.5">
                    {/* App Header */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-300 flex-1 truncate">App Name</span>
                      <span className="text-xs text-gray-400 flex-shrink-0">now</span>
                    </div>

                    {/* Notification Title */}
                    <div className="mb-1">
                      <p className="text-sm font-semibold text-white leading-tight line-clamp-2">
                        {displayTitle}
                      </p>
                    </div>

                    {/* Notification Body */}
                    <div>
                      <p className="text-sm text-gray-300 leading-tight line-clamp-4">
                        {content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
