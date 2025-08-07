import React, { useState } from 'react';
import { Github, GitlabIcon as Gitlab, Upload, Search } from 'lucide-react';

interface RepoConnectorProps {
  onConnect: (data: any) => void;
}

export function RepoConnector({ onConnect }: RepoConnectorProps) {
  const [method, setMethod] = useState<'github' | 'gitlab' | 'upload'>('github');
  const [repoUrl, setRepoUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRepoData = {
      name: 'sample-project',
      url: repoUrl || 'https://github.com/user/sample-project',
      method,
      branch: 'main',
      language: 'javascript'
    };
    
    onConnect(mockRepoData);
    setIsConnecting(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Connect Your Repository</h3>
      
      {/* Connection Method Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'github', label: 'GitHub', icon: Github, description: 'Connect via GitHub API' },
          { id: 'gitlab', label: 'GitLab', icon: Gitlab, description: 'Connect via GitLab API' },
          { id: 'upload', label: 'Upload', icon: Upload, description: 'Upload project files' }
        ].map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => setMethod(option.id as any)}
              className={`p-6 border-2 rounded-lg text-left transition-all duration-200 ${
                method === option.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-8 h-8 mb-3 ${
                method === option.id ? 'text-blue-600' : 'text-gray-600'
              }`} />
              <h4 className="font-medium text-gray-900 mb-1">{option.label}</h4>
              <p className="text-sm text-gray-600">{option.description}</p>
            </button>
          );
        })}
      </div>

      {/* Repository URL Input */}
      {(method === 'github' || method === 'gitlab') && (
        <div className="space-y-4">
          <div>
            <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 mb-2">
              Repository URL
            </label>
            <div className="relative">
              <input
                type="url"
                id="repo-url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder={`https://${method}.com/username/repository`}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <button
            onClick={handleConnect}
            disabled={!repoUrl || isConnecting}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Connect Repository</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* File Upload */}
      {method === 'upload' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Project Files</h4>
            <p className="text-gray-600 mb-4">Upload a ZIP file containing your project</p>
            <input
              type="file"
              accept=".zip"
              className="hidden"
              id="file-upload"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleConnect();
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Choose File
            </label>
          </div>
        </div>
      )}
    </div>
  );
}