import React, { useEffect, useState } from 'react';
import { Code, Package, Database, Cloud, CheckCircle } from 'lucide-react';

interface TechStackDetectorProps {
  repoData: any;
  onAnalyzed: (techStack: any) => void;
}

export function TechStackDetector({ repoData, onAnalyzed }: TechStackDetectorProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [techStack, setTechStack] = useState<any>(null);

  useEffect(() => {
    const analyzeTechStack = async () => {
      // Simulate tech stack analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const detectedStack = {
        language: 'JavaScript',
        framework: 'React',
        runtime: 'Node.js',
        packageManager: 'npm',
        testFramework: 'Jest',
        buildTool: 'Vite',
        deploymentTarget: 'Vercel'
      };
      
      setTechStack(detectedStack);
      setIsAnalyzing(false);
      
      // Auto-proceed after a short delay
      setTimeout(() => {
        onAnalyzed(detectedStack);
      }, 1000);
    };

    analyzeTechStack();
  }, [repoData, onAnalyzed]);

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Repository</h3>
        <p className="text-gray-600">Detecting tech stack and dependencies...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-green-600">
        <CheckCircle className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Tech Stack Detected</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Language', value: techStack.language, icon: Code },
          { label: 'Framework', value: techStack.framework, icon: Package },
          { label: 'Runtime', value: techStack.runtime, icon: Database },
          { label: 'Deploy Target', value: techStack.deploymentTarget, icon: Cloud }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">{item.label}</span>
              </div>
              <p className="font-semibold text-gray-900">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Recommended Pipeline Features</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Automated testing with {techStack.testFramework}</li>
          <li>• Build optimization with {techStack.buildTool}</li>
          <li>• Deployment to {techStack.deploymentTarget}</li>
          <li>• Code quality checks and linting</li>
          <li>• Security vulnerability scanning</li>
        </ul>
      </div>
    </div>
  );
}