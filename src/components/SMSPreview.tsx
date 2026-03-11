import React from 'react';

interface SMSPreviewProps {
  content: string;
}

export function SMSPreview({ content }: SMSPreviewProps) {
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
        <div className="relative w-full max-w-[340px]">
          {/* iPhone Frame */}
          <div className="bg-black rounded-[3rem] p-2.5 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-3xl z-10"></div>

            {/* Screen */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{ height: '600px' }}>
              {/* Status Bar */}
              <div className="bg-gray-50 px-6 py-3 flex justify-between items-center text-xs font-semibold">
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

              {/* Messages Header */}
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Sender</div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 bg-white flex-1 overflow-y-auto" style={{ maxHeight: 'calc(600px - 120px)' }}>
                <div className="flex flex-col items-start mb-2">
                  <div className="text-[11px] text-gray-500 mb-1.5 text-center w-full">{currentTime}</div>
                  <div className="bg-gray-200 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[80%] shadow-sm">
                    <p className="text-[15px] leading-relaxed text-gray-900 whitespace-pre-wrap break-words">{content}</p>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1">Delivered</div>
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
            {/* Screen */}
            <div className="bg-white rounded-[2rem] overflow-hidden" style={{ height: '600px' }}>
              {/* Status Bar */}
              <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
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

              {/* Messages Header */}
              <div className="bg-[#075E54] px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <button className="text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Sender</div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 bg-[#E5DDD5] flex-1 overflow-y-auto" style={{ maxHeight: 'calc(600px - 120px)' }}>
                <div className="flex flex-col items-start mb-2">
                  <div className="bg-white rounded-lg rounded-tl-none px-3.5 py-2.5 max-w-[80%] shadow-sm">
                    <p className="text-[15px] leading-relaxed text-gray-900 whitespace-pre-wrap break-words">{content}</p>
                    <div className="text-[11px] text-gray-500 text-right mt-1.5">{currentTime}</div>
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
