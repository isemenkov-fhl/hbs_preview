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
            <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col" style={{ height: '600px' }}>
              {/* Status Bar */}
              <div className="bg-white px-6 py-3 flex justify-between items-center text-xs font-semibold flex-shrink-0 text-gray-900">
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
              <div className="bg-[#F7F7F7] px-4 py-2.5 border-b border-[#E5E5E5] flex-shrink-0">
                <div className="flex items-center justify-between">
                  <button className="text-[#007AFF] text-lg -ml-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="flex flex-col items-center flex-1 -mt-1">
                    <div className="w-11 h-11 bg-[#8E99B3] rounded-full flex items-center justify-center text-white text-lg font-normal mb-0.5">
                      <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div className="font-semibold text-[17px] text-black -mt-0.5">Salmon</div>
                  </div>
                  <div className="w-6"></div>
                </div>
              </div>

              {/* Message Content */}
              <div className="px-3 py-2 bg-white flex-1 overflow-y-auto">
                <div className="flex flex-col items-start mb-2">
                  <div className="text-[13px] text-[#8E8E93] mb-1.5 text-center w-full font-normal">{currentTime}</div>
                  <div className="bg-[#E9E9EB] rounded-[20px] rounded-tl-[4px] px-3.5 py-2 max-w-[85%]">
                    <p className="text-[17px] leading-[22px] text-black whitespace-pre-wrap break-words font-normal">{content}</p>
                  </div>
                  <div className="text-[13px] text-[#8E8E93] mt-0.5 ml-0.5 font-normal">Delivered</div>
                </div>
              </div>

              {/* iOS Keyboard */}
              <div className="bg-[#D1D5DB] px-2 py-1.5 flex-shrink-0">
                <div className="bg-white rounded-lg p-2 mb-1">
                  <div className="grid grid-cols-10 gap-1 text-[10px]">
                    <div className="col-span-10 flex gap-1 mb-1">
                      {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                        <div key={key} className="flex-1 bg-white shadow-sm rounded py-1.5 text-center font-medium text-gray-900">{key}</div>
                      ))}
                    </div>
                    <div className="col-span-10 flex gap-1 px-2">
                      {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                        <div key={key} className="flex-1 bg-white shadow-sm rounded py-1.5 text-center font-medium text-gray-900">{key}</div>
                      ))}
                    </div>
                    <div className="col-span-10 flex gap-1">
                      <div className="w-8 bg-white shadow-sm rounded py-1.5 text-center">⇧</div>
                      {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => (
                        <div key={key} className="flex-1 bg-white shadow-sm rounded py-1.5 text-center font-medium text-gray-900">{key}</div>
                      ))}
                      <div className="w-8 bg-white shadow-sm rounded py-1.5 text-center">⌫</div>
                    </div>
                    <div className="col-span-10 flex gap-1 mt-1">
                      <div className="w-12 bg-white shadow-sm rounded py-1.5 text-center text-gray-600">123</div>
                      <div className="flex-1 bg-white shadow-sm rounded py-1.5 text-center text-gray-400">space</div>
                      <div className="w-12 bg-blue-500 text-white shadow-sm rounded py-1.5 text-center font-medium">↑</div>
                    </div>
                  </div>
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
            <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col" style={{ height: '600px' }}>
              {/* Status Bar */}
              <div className="bg-white px-4 py-2 flex justify-between items-center text-xs flex-shrink-0 text-gray-900">
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
              <div className="bg-[#075E54] px-4 py-3 text-white flex-shrink-0">
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
                    <div className="font-medium text-sm">Salmon</div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 bg-[#E5DDD5] flex-1 overflow-y-auto">
                <div className="flex flex-col items-start mb-2">
                  <div className="bg-white rounded-lg rounded-tl-none px-3.5 py-2.5 max-w-[80%] shadow-sm">
                    <p className="text-[15px] leading-relaxed text-gray-900 whitespace-pre-wrap break-words">{content}</p>
                    <div className="text-[11px] text-gray-500 text-right mt-1.5">{currentTime}</div>
                  </div>
                </div>
              </div>

              {/* Android Keyboard */}
              <div className="bg-[#E8EAED] px-1.5 py-1.5 flex-shrink-0">
                <div className="grid grid-cols-10 gap-1 text-[10px] mb-1">
                  {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                    <div key={key} className="bg-white shadow rounded py-2 text-center font-medium text-gray-900">{key}</div>
                  ))}
                </div>
                <div className="grid grid-cols-9 gap-1 text-[10px] mb-1 px-2">
                  {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                    <div key={key} className="bg-white shadow rounded py-2 text-center font-medium text-gray-900">{key}</div>
                  ))}
                </div>
                <div className="flex gap-1 text-[10px] mb-1">
                  <div className="bg-white shadow rounded py-2 px-3 text-center">⇧</div>
                  {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => (
                    <div key={key} className="flex-1 bg-white shadow rounded py-2 text-center font-medium text-gray-900">{key}</div>
                  ))}
                  <div className="bg-white shadow rounded py-2 px-3 text-center">⌫</div>
                </div>
                <div className="flex gap-1 text-[10px]">
                  <div className="bg-white shadow rounded py-2 px-3 text-center text-gray-600">?123</div>
                  <div className="bg-white shadow rounded py-2 px-2 text-center">🙂</div>
                  <div className="flex-1 bg-white shadow rounded py-2 text-center text-gray-400">space</div>
                  <div className="bg-white shadow rounded py-2 px-3 text-center text-gray-600">.</div>
                  <div className="bg-white shadow rounded py-2 px-3 text-center">↵</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
