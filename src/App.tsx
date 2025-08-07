import React, { useState } from 'react';
import { Dashboard } from './components/dashboard/Dashboard';
import { PipelineGenerator } from './components/pipeline/PipelineGenerator';
import { PerformanceMonitor } from './components/dashboard/PerformanceMonitor';
import { Navigation } from './components/ui/Navigation';

type ActiveModule = 'dashboard' | 'pipeline' | 'monitor';

function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'pipeline':
        return <PipelineGenerator />;
      case 'monitor':
        return <PerformanceMonitor />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="pt-16">
        {renderActiveModule()}
      </main>
    </div>
  );
}

export default App;