import React, { useState } from 'react';
import { Upload, Filter, Download, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { LogAnalyzer } from '../analysis/LogAnalyzer';
import { PerformanceMetrics } from '../dashboard/PerformanceMetrics';
import { OptimizationSuggestions } from '../analysis/OptimizationSuggestions';

export function PerformanceMonitor() {
  const [activeTab, setActiveTab] = useState<'upload' | 'metrics' | 'suggestions'>('upload');
  const [logs, setLogs] = useState<any[]>([]);

  const tabs = [
    { id: 'upload', label: 'Log Analysis', icon: Upload },
    { id: 'metrics', label: 'Performance Metrics', icon: TrendingUp },
    { id: 'suggestions', label: 'Optimization', icon: AlertTriangle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return <LogAnalyzer onLogsAnalyzed={setLogs} />;
      case 'metrics':
        return <PerformanceMetrics logs={logs} />;
      case 'suggestions':
        return <OptimizationSuggestions logs={logs} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Monitor</h2>
        <p className="text-gray-600">Analyze CI/CD logs and get optimization recommendations</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}