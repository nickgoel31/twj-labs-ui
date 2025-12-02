"use client"

import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Code2, 
  Eye, 
  RefreshCw,
  Maximize2
} from 'lucide-react';

interface SectionPlaygroundProps {
  children?: React.ReactNode;
  code: string;
  title?: string;
  description?: string;
  scope?: any; // Kept for compatibility
}

export default function SectionPlayground({ 
  children,
  code, 
  title = "Section Preview", 
  description 
}: SectionPlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [width, setWidth] = useState<'100%' | '100vw' | '768px' | '375px'>('100%');
  const [isCopied, setIsCopied] = useState(false);
  const [key, setKey] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="w-full my-10 rounded-xl border border-neutral-800 bg-neutral-950/50 overflow-hidden shadow-sm flex flex-col">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm z-20">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          
          <div className="flex items-center p-1 rounded-lg bg-neutral-950 border border-neutral-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'preview' 
                  ? 'bg-neutral-800 text-white shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'code' 
                  ? 'bg-neutral-800 text-white shadow-sm' 
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Code
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'preview' ? (
            <div className="hidden sm:flex items-center gap-1 text-neutral-500">
              <button onClick={() => setWidth('100%')} className="p-1.5 rounded hover:bg-neutral-800 transition-colors" title="Full Width">
                <Maximize2 className="w-4 h-4" />
              </button>
              <button onClick={() => setWidth('100%')} className="p-1.5 rounded hover:bg-neutral-800 transition-colors" title="Desktop">
                <Monitor className="w-4 h-4" />
              </button>
              <button onClick={() => setWidth('768px')} className="p-1.5 rounded hover:bg-neutral-800 transition-colors" title="Tablet">
                <Tablet className="w-4 h-4" />
              </button>
              <button onClick={() => setWidth('375px')} className="p-1.5 rounded hover:bg-neutral-800 transition-colors" title="Mobile">
                <Smartphone className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-neutral-800 mx-1" />
              <button onClick={handleReset} className="p-1.5 rounded hover:bg-neutral-800 hover:text-white transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          ) : (
             <button onClick={handleCopy} className="flex items-center gap-2 text-xs text-neutral-500 hover:text-white ml-2">
                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
             </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative w-full bg-neutral-950 border-b border-neutral-800/50">
        {activeTab === 'preview' ? (
          <div className="w-full h-[600px] bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] flex justify-center overflow-hidden relative">
            
            {/* Resizable Container */}
            <div 
              className={`
                 relative h-full bg-black shadow-2xl overflow-y-auto overflow-x-hidden transition-[width] duration-500 ease-in-out border-x border-neutral-800
                 ${width === '100%' ? 'w-full' : ''}
              `}
              style={{ width: width === '100%' ? '100%' : width }}
            >
               {/* We key the children container to force a full re-mount 
                  when the user hits the "Reset" button.
               */}
              <div key={key} className="min-h-full w-full">
                {children}
              </div>
            </div>

          </div>
        ) : (
          <div className="w-full h-[600px] overflow-auto p-6 text-sm font-mono leading-relaxed bg-neutral-950 text-neutral-300">
            <pre>
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Footer Info */}
      {description && (
        <div className="px-4 py-3 bg-neutral-900/30 text-xs text-neutral-500">
          {description}
        </div>
      )}
    </div>
  );
}