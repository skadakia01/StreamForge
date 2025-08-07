import React from 'react';
import { Lightbulb, Zap, Target, ArrowRight } from 'lucide-react';

interface OptimizationSuggestionsProps {
  logs: any[];
}

export function OptimizationSuggestions({ logs }: OptimizationSuggestionsProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Suggestions Available</h3>
        <p className="text-gray-600">Upload log files to get optimization recommendations</p>
      </div>
    );
  }

  const suggestions = [
    {
      id: 1,
      category: 'Caching',
      title: 'Implement Dependency Caching',
      description: 'Your install stage takes an average of 77 seconds. Implement dependency caching to reduce this by up to 60%.',
      impact: 'High',
      effort: 'Low',
      savings: '~45s per build',
      steps: [
        'Add cache action before npm install',
        'Use npm ci instead of npm install',
        'Cache node_modules directory'
      ]
    },
    {
      id: 2,
      category: 'Parallelization',
      title: 'Run Tests in Parallel',
      description: 'Test execution could be optimized by running test suites in parallel across multiple runners.',
      impact: 'Medium',
      effort: 'Medium',
      savings: '~30s per build',
      steps: [
        'Split test suites by type',
        'Configure parallel test runners',
        'Use matrix builds for different environments'
      ]
    },
    {
      id: 3,
      category: 'Resource Optimization',
      title: 'Upgrade Runner Specifications',
      description: 'Consider using larger runners for CPU-intensive build steps to reduce overall pipeline duration.',
      impact: 'Medium',
      effort: 'Low',
      savings: '~20s per build',
      steps: [
        'Upgrade to 4-core runners for build stage',
        'Use SSD storage for faster I/O',
        'Consider memory optimization'
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-900">Optimization Potential</h3>
        </div>
        <p className="text-blue-800 mb-4">
          Based on your pipeline analysis, you could potentially reduce build times by up to <strong>95 seconds</strong> 
          and improve success rates by implementing the suggested optimizations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Potential Time Savings</p>
            <p className="text-xl font-bold text-blue-900">95s per build</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Estimated Cost Reduction</p>
            <p className="text-xl font-bold text-green-900">~40%</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Implementation Effort</p>
            <p className="text-xl font-bold text-yellow-900">Low-Medium</p>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Optimization Recommendations</h3>
        
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {suggestion.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                    {suggestion.impact} Impact
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(suggestion.effort)}`}>
                    {suggestion.effort} Effort
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{suggestion.title}</h4>
                <p className="text-gray-600 mb-4">{suggestion.description}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-600">Potential Savings</p>
                <p className="text-lg font-bold text-green-600">{suggestion.savings}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h5 className="font-medium text-gray-900 mb-3">Implementation Steps:</h5>
              <ol className="space-y-2">
                {suggestion.steps.map((step, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <span>Apply Optimization</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Best Practices */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">General Best Practices</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Performance</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Use appropriate runner sizes for workload</li>
              <li>• Implement comprehensive caching strategies</li>
              <li>• Optimize Docker image sizes and layers</li>
              <li>• Minimize network requests during builds</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Reliability</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Implement retry mechanisms for flaky tests</li>
              <li>• Use health checks and proper error handling</li>
              <li>• Set appropriate timeouts for each stage</li>
              <li>• Monitor resource usage and limits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}