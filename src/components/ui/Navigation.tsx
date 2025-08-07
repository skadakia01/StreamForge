import React from 'react';
import { Activity, GitBranch, BarChart3, Settings } from 'lucide-react';

type ActiveModule = 'dashboard' | 'pipeline' | 'monitor';

interface NavigationProps {
  activeModule: ActiveModule;
  onModuleChange: (module: ActiveModule) => void;
}

export function Navigation({ activeModule, onModuleChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Activity },
    { id: 'pipeline' as const, label: 'Pipeline Generator', icon: GitBranch },
    { id: 'monitor' as const, label: 'Performance Monitor', icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">StreamForge</h1>
            </div>
            
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onModuleChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">System Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
}