import React from 'react';
import { GitBranch, Clock, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { RecentPipelines } from './RecentPipelines';
import { PerformanceChart } from '../charts/PerformanceChart';

export function Dashboard() {
  const metrics: Array<{
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ComponentType;
    color: 'blue' | 'green' | 'purple' | 'red';
  }> = [
    {
      title: 'Active Pipelines',
      value: '24',
      change: '+3 from last week',
      trend: 'up' as const,
      icon: GitBranch,
      color: 'blue'
    },
    {
      title: 'Avg Build Time',
      value: '4m 32s',
      change: '-12s from last week',
      trend: 'down' as const,
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1% from last week',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Failed Builds',
      value: '7',
      change: '+2 from last week',
      trend: 'up' as const,
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">DevOps Dashboard</h2>
        <p className="text-gray-600">Monitor your CI/CD pipelines and performance metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Performance Trends</h3>
          <PerformanceChart />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Pipeline Runs</h3>
          <RecentPipelines />
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">CI/CD Systems</p>
              <p className="text-sm text-green-700">All systems operational</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Build Queue</p>
              <p className="text-sm text-blue-700">3 builds pending</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Monitoring</p>
              <p className="text-sm text-yellow-700">2 alerts require attention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}