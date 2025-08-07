import React from 'react';
import { Copy, Download } from 'lucide-react';

interface YamlEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export function YamlEditor({ value, onChange, readOnly = false }: YamlEditorProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pipeline.yml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">pipeline.yml</span>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Download</span>
          </button>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
          className="w-full h-96 p-4 font-mono text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          style={{ minHeight: '400px' }}
        />
        
        {/* Line numbers */}
        <div className="absolute left-0 top-0 p-4 pointer-events-none">
          <div className="font-mono text-sm text-gray-400 select-none">
            {value.split('\n').map((_, index) => (
              <div key={index} className="h-5 leading-5">
                {index + 1}
              </div>
            ))}
          </div>
        </div>
        
        <style>{`
          textarea {
            padding-left: 3rem;
          }
        `}</style>
      </div>
    </div>
  );
}