"use client"

import React, { useState, useEffect } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { 
  Check, Copy, Code2, Eye, RefreshCw, Palette, ChevronDown, 
  Settings // Import Settings for the icon used in your example
} from 'lucide-react';
import { themes } from 'prism-react-renderer';
import { Theme, themes as twjThemes } from '@/twj-lib/types';

// --- IMPORT YOUR COMPONENTS HERE ---
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// You likely need an Input component too based on your example code
// import { Input } from '@/components/ui/input'; 

// Mock Input if you don't have it yet, to prevent crashes
const Input = (props: any) => <input {...props} className="border p-2 rounded" />;

interface ComponentPlaygroundProps {
  code: string;
  // scope is now optional/secondary since we hardcode the main ones
  scope?: Record<string, any>; 
  title?: string;
  description?: string;
  noInline?: boolean;
  availableThemes?: Theme[];
}

export default function ComponentPlayground({ 
  code: initialCode, 
  scope = {}, // Default to empty object, we merge below
  title = "Component Preview", 
  description,
  noInline = false,
  availableThemes = twjThemes 
}: ComponentPlaygroundProps) {

  // ... (Keep all your existing state logic: activeTab, width, etc.) ...
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [width, setWidth] = useState<'100%' | '768px' | '375px'>('100%');
  const [isCopied, setIsCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [code, setCode] = useState(initialCode);
  const [currentTheme, setCurrentTheme] = useState<Theme>('modern');

  // ... (Keep your useEffects and handlers) ...
  useEffect(() => {
    const match = initialCode.match(/theme=(["'])(.*?)\1/);
    if (match && match[2]) setCurrentTheme(match[2] as Theme);
  }, [initialCode]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setRefreshKey(prev => prev + 1);
    setCode(initialCode); 
    const match = initialCode.match(/theme=(["'])(.*?)\1/);
    if (match && match[2]) setCurrentTheme(match[2] as Theme);
  };

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme as Theme);
    const newCode = code.replace(/theme=(["'])(.*?)\1/g, `theme="${newTheme}"`);
    setCode(newCode);
  };

  // 1. DEFINE THE SCOPE HERE
  const builtInScope = {
    React,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Input,
    Settings, // Added Settings icon
    ...scope // Allow overriding or adding extra scope if needed (though passing funcs from server will still fail)
  };

  return (
    <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50 shadow-sm transition-colors duration-200">
      <LiveProvider 
        key={refreshKey}
        code={code} 
        scope={builtInScope} // Use the local scope
        noInline={noInline} 
        theme={themes.vsDark}
      >
        {/* ... (Keep the rest of your JSX exactly as it was) ... */}
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm gap-4 transition-colors duration-200">
           {/* ... header content ... */}
           <div className="flex items-center gap-4">
            <div className="flex items-center p-1 rounded-lg bg-neutral-200/50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <button onClick={() => setActiveTab('preview')} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'preview' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'}`}>
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'code' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300'}`}>
                <Code2 className="w-3.5 h-3.5" /> Code
              </button>
            </div>
            <div className="relative group flex items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md text-xs text-neutral-600 dark:text-neutral-400">
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Theme:</span>
                <select value={currentTheme} onChange={(e) => handleThemeChange(e.target.value)} className="bg-transparent border-none outline-none text-neutral-900 dark:text-white font-medium appearance-none cursor-pointer pl-1 pr-6" style={{ backgroundImage: 'none' }}>
                  {availableThemes.map(t => (
                    <option className='bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white' key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-3 pointer-events-none text-neutral-500" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
             {activeTab === 'preview' && (
              <div className="hidden sm:flex items-center gap-1 text-neutral-500">
                <button onClick={handleReset} title="Reset Code" className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            )}
            <button onClick={() => handleCopy(code)} className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white ml-2 transition-colors">
              {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full h-fit bg-neutral-100 dark:bg-neutral-950 transition-colors duration-200 overflow-hidden ">
          {activeTab === 'preview' ? (
            <div className="w-full h-full min-h-[400px] p-8 flex justify-center items-start overflow-auto bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] dark:bg-[radial-gradient(#26262650_1px,transparent_1px)] [background-size:16px_16px]">
              <div className="" style={{ width: width }}>
                 <div className="p-10">
                    <LivePreview />
                 </div>
                 <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-200 text-sm p-4 border-t border-red-200 dark:border-red-900/50 empty:hidden">
                    <LiveError />
                 </div>
              </div>
            </div>
          ) : (
             <LiveEditor disabled className="font-mono text-sm leading-relaxed p-4 focus:outline-none bg-[#1e1e1e]!" />
          )}
        </div>

        {description && (
          <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 text-xs text-neutral-500">
            {description}
          </div>
        )}
      </LiveProvider>
    </div>
  );
}