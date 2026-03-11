import React from 'react';

interface ViberPreviewProps {
  content: string;
}

export function ViberPreview({ content }: ViberPreviewProps) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
      {/* iOS Device */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">iOS</h3>
        <div className="relative w-full max-w-[375px]">
          {/* iPhone Frame */}
          <div className="bg-black rounded-[3rem] p-3 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>

            {/* Screen */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
              {/* Status Bar */}
              <div className="bg-[#7360F2] px-6 py-3 flex justify-between items-center text-xs font-semibold text-white">
                <span>{currentTime}</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Viber Header */}
              <div className="bg-[#7360F2] px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <button className="text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#7360F2] text-sm font-bold">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.4 0C9.82 0 5.5.25 3.5 2.25.77 4.98.5 9.17.5 12.18c0 3 .27 7.19 3 9.92 2 2 6.32 2.25 7.9 2.25 1.58 0 5.9-.25 7.9-2.25 2.73-2.73 3-6.92 3-9.92 0-3-.27-7.2-3-9.93C17.3.25 12.98 0 11.4 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base">Business</div>
                    <div className="text-xs opacity-90">Verified Account</div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 bg-white flex-1">
                <div className="flex flex-col items-start mb-2">
                  <div className="text-xs text-gray-500 mb-1">{currentTime}</div>
                  <div className="bg-[#F2F2F7] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">{content}</p>
                  </div>
                </div>
              </div>

              {/* Viber Input Bar */}
              <div className="bg-white border-t border-gray-200 px-4 py-2">
                <div className="flex items-center gap-2">
                  <button className="text-gray-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  </button>
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
                    Type a message...
                  </div>
                  <button className="text-[#7360F2]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Android Device */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Android</h3>
        <div className="relative w-full max-w-[375px]">
          {/* Android Frame */}
          <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
            {/* Screen */}
            <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/19.5]">
              {/* Status Bar */}
              <div className="bg-[#7360F2] px-4 py-2 flex justify-between items-center text-xs text-white">
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

              {/* Viber Header */}
              <div className="bg-[#7360F2] px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <button className="text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#7360F2]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.4 0C9.82 0 5.5.25 3.5 2.25.77 4.98.5 9.17.5 12.18c0 3 .27 7.19 3 9.92 2 2 6.32 2.25 7.9 2.25 1.58 0 5.9-.25 7.9-2.25 2.73-2.73 3-6.92 3-9.92 0-3-.27-7.2-3-9.93C17.3.25 12.98 0 11.4 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base">Business</div>
                    <div className="text-xs opacity-90">Verified Account</div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 bg-[#F7F7F7] flex-1 min-h-[400px]">
                <div className="flex flex-col items-start mb-2">
                  <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">{content}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 text-right mt-1">
                      <span>{currentTime}</span>
                      <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Viber Input Bar */}
              <div className="bg-white border-t border-gray-200 px-4 py-2">
                <div className="flex items-center gap-2">
                  <button className="text-gray-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                    </svg>
                  </button>
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
                    Type a message...
                  </div>
                  <button className="text-[#7360F2]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
