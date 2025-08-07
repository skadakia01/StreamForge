import React from 'react';
import { DivideIcon as LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'red';
}

export function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  };

  const trendColors = {
    up: trend === 'up' && (color === 'green' || color === 'purple') ? 'text-green-600' : 'text-red-600',
    down: trend === 'down' && color === 'green' ? 'text-green-600' : 'text-red-600'
  };

  const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
          <TrendIcon className="w-4 h-4" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600 mb-2">{title}</p>
      <p className={`text-xs flex items-center space-x-1 ${trendColors[trend]}`}>
        <span>{change}</span>
      </p>
    </div>
  );
}