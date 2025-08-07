import React, { useState } from 'react';
import { Github, GitlabIcon as Gitlab, Upload, Download, Play, Settings } from 'lucide-react';
import { RepoConnector } from '../tools/RepoConnector';
import { YamlEditor } from '../tools/YamlEditor';
import { TechStackDetector } from '../tools/TechStackDetector';

export function PipelineGenerator() {
  const [step, setStep] = useState<'connect' | 'analyze' | 'generate' | 'customize'>('connect');
  const [repoData, setRepoData] = useState<any>(null);
  const [generatedYaml, setGeneratedYaml] = useState<string>('');

  const handleRepoConnect = (data: any) => {
    setRepoData(data);
    setStep('analyze');
  };

  const handleTechStackAnalyzed = (techStack: any) => {
    // Simulate YAML generation based on tech stack
    const yaml = generateYamlFromTechStack(techStack);
    setGeneratedYaml(yaml);
    setStep('generate');
  };

  const generateYamlFromTechStack = (techStack: any) => {
    return `# Generated CI/CD Pipeline for ${techStack.framework || 'Unknown'} project
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      run: echo "Deploying to production..."
      # Add your deployment steps here
`;
  };

  const renderStep = () => {
    switch (step) {
      case 'connect':
        return <RepoConnector onConnect={handleRepoConnect} />;
      case 'analyze':
        return <TechStackDetector repoData={repoData} onAnalyzed={handleTechStackAnalyzed} />;
      case 'generate':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Generated Pipeline</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('customize')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Customize</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <YamlEditor value={generatedYaml} onChange={setGeneratedYaml} readOnly />
          </div>
        );
      case 'customize':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Customize Pipeline</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('generate')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Preview
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Deploy Pipeline</span>
                </button>
              </div>
            </div>
            <YamlEditor value={generatedYaml} onChange={setGeneratedYaml} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">CI/CD Pipeline Generator</h2>
        <p className="text-gray-600">Automatically generate optimized CI/CD pipelines for your repositories</p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          {[
            { id: 'connect', label: 'Connect Repository', completed: step !== 'connect' },
            { id: 'analyze', label: 'Analyze Tech Stack', completed: step === 'generate' || step === 'customize' },
            { id: 'generate', label: 'Generate Pipeline', completed: step === 'customize' },
            { id: 'customize', label: 'Customize & Deploy', completed: false }
          ].map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s.completed
                  ? 'bg-green-100 text-green-800'
                  : step === s.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {index + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                step === s.id ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {s.label}
              </span>
              {index < 3 && <div className="w-8 h-px bg-gray-300 ml-4" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {renderStep()}
      </div>
    </div>
  );
}