"use client"

import Link from 'next/link';
import { ArrowRight, Terminal, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCommand = "npx @twjlabs/ui init";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden dark:bg-neutral-950 dark:text-white selection:bg-indigo-500/30 py-20">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/50 border border-neutral-800 text-xs font-medium text-neutral-400 mb-8 animate-fade-in backdrop-blur-sm cursor-pointer hover:border-neutral-700 transition-colors">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
          v1.0 is now live
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
          Build beautiful interfaces <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient bg-300%">
            at warp speed.
          </span>
        </h1>

        {/* Subheading */}
        <p className=" text-neutral-400 max-w-2xl mb-10 leading-relaxed">
          A collection of accessible, reusable, and composable React components. 
          Styled with Tailwind CSS and designed for modern web applications.
        </p>

        {/* Action Area */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          
          {/* Primary Button */}
          <Link 
            href="/docs" 
            className="group flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.6)]"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Code/Terminal Snippet */}
          <div className="relative group flex items-center gap-3 px-5 py-3.5 bg-neutral-900/80 border border-neutral-800 rounded-lg font-mono text-sm text-neutral-300 backdrop-blur-md min-w-[280px]">
             <Terminal className="w-4 h-4 text-neutral-500" />
             <span>{installCommand}</span>
             <button 
                onClick={handleCopy}
                className="absolute right-3 p-1.5 hover:bg-neutral-800 rounded-md transition-colors text-neutral-500 hover:text-white"
             >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
             </button>
          </div>
        </div>

        {/* Tech Stack / Social Proof */}
        <div className="mt-16 pt-8 border-t border-neutral-800/50 w-full max-w-md mx-auto">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-4">
            Works flawlessly with
          </p>
          <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Replace these spans with SVGs of Next.js, React, Tailwind */}
             <span className="font-bold text-lg">Next.js</span>
             <span className="font-bold text-lg">React</span>
             <span className="font-bold text-lg">Tailwind</span>
             <span className="font-bold text-lg">TypeScript</span>
          </div>
        </div>

      </div>
    </section>
  );
}