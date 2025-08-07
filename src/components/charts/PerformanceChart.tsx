import React from 'react';

export function PerformanceChart() {
  const data = [
    { day: 'Mon', buildTime: 240, tests: 95 },
    { day: 'Tue', buildTime: 220, tests: 88 },
    { day: 'Wed', buildTime: 280, tests: 92 },
    { day: 'Thu', buildTime: 200, tests: 96 },
    { day: 'Fri', buildTime: 190, tests: 94 },
    { day: 'Sat', buildTime: 210, tests: 97 },
    { day: 'Sun', buildTime: 180, tests: 93 }
  ];

  const maxBuildTime = Math.max(...data.map(d => d.buildTime));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Build Time (seconds)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Success Rate (%)</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-48 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div className="relative w-full flex items-end justify-center space-x-1">
              {/* Build Time Bar */}
              <div
                className="bg-blue-500 rounded-t w-6 transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${(item.buildTime / maxBuildTime) * 120}px` }}
                title={`Build Time: ${item.buildTime}s`}
              ></div>
              
              {/* Success Rate Bar */}
              <div
                className="bg-green-500 rounded-t w-6 transition-all duration-300 hover:bg-green-600"
                style={{ height: `${(item.tests / 100) * 120}px` }}
                title={`Success Rate: ${item.tests}%`}
              ></div>
            </div>
            
            <span className="text-xs text-gray-600 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-600">Avg Build Time</p>
          <p className="text-lg font-semibold text-blue-600">
            {Math.round(data.reduce((sum, d) => sum + d.buildTime, 0) / data.length)}s
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Success Rate</p>
          <p className="text-lg font-semibold text-green-600">
            {Math.round(data.reduce((sum, d) => sum + d.tests, 0) / data.length)}%
          </p>
        </div>
      </div>
    </div>
  );
}