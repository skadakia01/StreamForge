import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

export function RecentPipelines() {
  const pipelines = [
    {
      id: 1,
      name: 'frontend-build',
      branch: 'main',
      status: 'success',
      duration: '2m 34s',
      time: '5 minutes ago',
      commit: 'feat: add new dashboard'
    },
    {
      id: 2,
      name: 'backend-api',
      branch: 'develop',
      status: 'running',
      duration: '1m 45s',
      time: 'Running',
      commit: 'fix: auth validation'
    },
    {
      id: 3,
      name: 'integration-tests',
      branch: 'feature/auth',
      status: 'failed',
      duration: '4m 12s',
      time: '15 minutes ago',
      commit: 'test: add integration tests'
    },
    {
      id: 4,
      name: 'deployment',
      branch: 'main',
      status: 'success',
      duration: '1m 23s',
      time: '1 hour ago',
      commit: 'deploy: production release'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'running':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'running':
        return 'text-blue-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="space-y-3">
      {pipelines.map((pipeline) => (
        <div key={pipeline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-3">
            {getStatusIcon(pipeline.status)}
            <div>
              <p className="font-medium text-gray-900">{pipeline.name}</p>
              <p className="text-sm text-gray-600">{pipeline.commit}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className={`text-sm font-medium ${getStatusColor(pipeline.status)}`}>
              {pipeline.status}
            </p>
            <p className="text-xs text-gray-500">
              {pipeline.duration} • {pipeline.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}