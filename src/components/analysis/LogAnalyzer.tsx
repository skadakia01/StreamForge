import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

interface LogAnalyzerProps {
  onLogsAnalyzed: (logs: any[]) => void;
}

export function LogAnalyzer({ onLogsAnalyzed }: LogAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate log analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockLogs = [
      {
        id: 1,
        pipeline: 'frontend-build',
        duration: 245,
        status: 'success',
        stages: [
          { name: 'checkout', duration: 12, status: 'success' },
          { name: 'install', duration: 89, status: 'success' },
          { name: 'test', duration: 67, status: 'success' },
          { name: 'build', duration: 45, status: 'success' },
          { name: 'deploy', duration: 32, status: 'success' }
        ]
      },
      {
        id: 2,
        pipeline: 'backend-test',
        duration: 178,
        status: 'failed',
        stages: [
          { name: 'checkout', duration: 8, status: 'success' },
          { name: 'install', duration: 65, status: 'success' },
          { name: 'test', duration: 105, status: 'failed' }
        ]
      }
    ];
    
    onLogsAnalyzed(mockLogs);
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  const mockRecentRuns = [
    { id: 1, name: 'frontend-build', time: '2m 45s', status: 'success', ago: '5 minutes ago' },
    { id: 2, name: 'backend-test', time: '1m 58s', status: 'failed', ago: '12 minutes ago' },
    { id: 3, name: 'integration-test', time: '3m 12s', status: 'success', ago: '25 minutes ago' },
    { id: 4, name: 'deployment', time: '1m 33s', status: 'success', ago: '1 hour ago' }
  ];

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Logs</h3>
        <p className="text-gray-600">Processing build logs and extracting performance metrics...</p>
      </div>
    );
  }

  if (analysisComplete) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Analysis Complete</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Total Runs Analyzed</h4>
            <p className="text-2xl font-bold text-blue-800">24</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Success Rate</h4>
            <p className="text-2xl font-bold text-green-800">87.5%</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Avg Duration</h4>
            <p className="text-2xl font-bold text-yellow-800">2m 15s</p>
          </div>
        </div>
        
        <p className="text-gray-600">
          Switch to the Performance Metrics tab to view detailed analysis, or check Optimization for improvement suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Upload CI/CD Logs</h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Log Files</h4>
          <p className="text-gray-600 mb-4">
            Upload Jenkins, GitHub Actions, or GitLab CI log files for analysis
          </p>
          <input
            type="file"
            accept=".log,.txt,.json"
            multiple
            className="hidden"
            id="log-upload"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length > 0) {
                handleFileUpload(files[0]);
              }
            }}
          />
          <label
            htmlFor="log-upload"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            Choose Files
          </label>
        </div>
      </div>

      {/* Recent Pipeline Runs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Pipeline Runs</h3>
        
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600">
              <span>Pipeline</span>
              <span>Duration</span>
              <span>Status</span>
              <span>Time</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {mockRecentRuns.map((run) => (
              <div key={run.id} className="px-4 py-3 hover:bg-white transition-colors">
                <div className="grid grid-cols-4 gap-4 items-center">
                  <span className="font-medium text-gray-900">{run.name}</span>
                  <span className="flex items-center space-x-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{run.time}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    {run.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      run.status === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {run.status}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500">{run.ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}