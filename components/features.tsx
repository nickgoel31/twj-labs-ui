"use client"

import React from 'react';
import { Box, Layers, Palette, ArrowRight, CheckCircle2, LayoutTemplate } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="relative w-full py-24 bg-neutral-950 text-white overflow-hidden">
      
      {/* Background Decor - Seamlessly blends with Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            More than just components.
          </h2>
          <p className="text-neutral-400 text-lg">
            A complete ecosystem to speed up your development workflow. 
            Beautifully designed, fully accessible, and easy to customize.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

          {/* Feature 1: Components (Large Card) */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-8 relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
                  <Box className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">50+ Accessible Components</h3>
                <p className="text-neutral-400 max-w-md">
                  From essential buttons and inputs to complex data tables and calendar widgets. 
                  All components are fully typed and WAI-ARIA compliant.
                </p>
              </div>

              {/* Visual: Mini Component Showcase */}
              <div className="mt-8 flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <button className="px-4 py-2 bg-indigo-600 rounded-md text-xs font-semibold shadow-lg shadow-indigo-500/20">Button</button>
                <div className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-xs text-neutral-300">Input field</div>
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Success
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Prebuilt Sections (Tall Card) */}
          <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-8 relative z-10">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prebuilt Sections</h3>
              <p className="text-neutral-400 text-sm mb-6">
                Drag-and-drop marketing sections. Hero, Pricing, FAQ, and Footer—ready to go.
              </p>
              
              {/* Visual: Wireframe Representation */}
              <div className="space-y-2 opacity-40 group-hover:opacity-80 transition-opacity">
                <div className="h-16 w-full rounded bg-neutral-800 border border-neutral-700/50" />
                <div className="flex gap-2">
                    <div className="h-24 w-1/3 rounded bg-neutral-800 border border-neutral-700/50" />
                    <div className="h-24 w-2/3 rounded bg-neutral-800 border border-neutral-700/50" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Theming (Tall Card) */}
          <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-8 relative z-10">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4 text-pink-400">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Theming</h3>
              <p className="text-neutral-400 text-sm mb-6">
                Change your brand feel in seconds. CSS variables for colors, fonts, and border radius.
              </p>

              {/* Visual: Color Dots */}
              <div className="flex gap-3 mt-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-offset-neutral-900 ring-blue-500 cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-rose-500 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-amber-500 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
                  <div className="w-8 h-8 rounded-full bg-emerald-500 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
            </div>
          </div>

           {/* Feature 4: Tech Stack (Large Card) */}
           <div className="md:col-span-2 group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Framework Agnostic*</h3>
                <p className="text-neutral-400 max-w-sm">
                  Designed for React, but compatible with any framework that supports Tailwind CSS. 
                  Export to Vue, Svelte, or HTML with ease.
                </p>
              </div>
              
              {/* Action */}
              <button className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-sm font-medium transition-all group-hover:translate-x-1">
                 View Documentation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}