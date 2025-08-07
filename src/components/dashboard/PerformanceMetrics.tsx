import React from 'react';
import { BarChart3, TrendingUp, Clock, AlertCircle } from 'lucide-react';

interface PerformanceMetricsProps {
  logs: any[];
}

export function PerformanceMetrics({ logs }: PerformanceMetricsProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
        <p className="text-gray-600">Upload log files to view performance metrics</p>
      </div>
    );
  }

  const avgDuration = logs.reduce((sum, log) => sum + log.duration, 0) / logs.length;
  const successRate = (logs.filter(log => log.status === 'success').length / logs.length) * 100;
  const slowestStage = logs
    .flatMap(log => log.stages)
    .sort((a, b) => b.duration - a.duration)[0];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Avg Duration</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{Math.round(avgDuration / 60)}m {avgDuration % 60}s</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{successRate.toFixed(1)}%</p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-600">Slowest Stage</span>
          </div>
          <p className="text-lg font-bold text-yellow-900">{slowestStage?.name}</p>
          <p className="text-sm text-yellow-700">{slowestStage?.duration}s</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Total Runs</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{logs.length}</p>
        </div>
      </div>

      {/* Pipeline Performance Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Duration Trends</h3>
        
        <div className="space-y-4">
          {logs.map((log, index) => (
            <div key={log.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{log.pipeline}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  log.status === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {log.status}
                </span>
              </div>
              
              <div className="relative">
                <div className="flex h-6 bg-gray-200 rounded-lg overflow-hidden">
                  {log.stages.map((stage: any, stageIndex: number) => {
                    const percentage = (stage.duration / log.duration) * 100;
                    const colors = [
                      'bg-blue-400',
                      'bg-green-400', 
                      'bg-yellow-400',
                      'bg-purple-400',
                      'bg-pink-400'
                    ];
                    
                    return (
                      <div
                        key={stageIndex}
                        className={`${colors[stageIndex % colors.length]} flex items-center justify-center`}
                        style={{ width: `${percentage}%` }}
                        title={`${stage.name}: ${stage.duration}s`}
                      >
                        {percentage > 10 && (
                          <span className="text-xs text-white font-medium">
                            {stage.name}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>0s</span>
                  <span>{Math.floor(log.duration / 60)}m {log.duration % 60}s</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage Performance Breakdown */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Performance Breakdown</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">Stage</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Avg Duration</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Success Rate</th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {['checkout', 'install', 'test', 'build', 'deploy'].map((stageName) => {
                const stageData = logs
                  .flatMap(log => log.stages)
                  .filter(stage => stage.name === stageName);
                
                if (stageData.length === 0) return null;
                
                const avgDuration = stageData.reduce((sum, stage) => sum + stage.duration, 0) / stageData.length;
                const successRate = (stageData.filter(stage => stage.status === 'success').length / stageData.length) * 100;
                
                return (
                  <tr key={stageName}>
                    <td className="py-3 font-medium text-gray-900 capitalize">{stageName}</td>
                    <td className="py-3 text-gray-600">{avgDuration.toFixed(0)}s</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        successRate >= 90
                          ? 'bg-green-100 text-green-800'
                          : successRate >= 70
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {successRate.toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-3">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}