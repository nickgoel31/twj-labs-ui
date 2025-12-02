import React from 'react';
import { ArrowRight, Sparkles, MoveRight } from 'lucide-react';

export default function AgencyCTA() {
  return (
    <section className="relative w-full py-24 bg-neutral-950 overflow-hidden">
        
      {/* Visual Separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/30">
            
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-900/0 to-neutral-900/0" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]" />

            <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-16 relative z-10">
                
                {/* Left Content */}
                <div className="flex flex-col items-start text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
                        <Sparkles className="w-3 h-3" />
                        Built by the experts
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Need a custom website <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                            built by pros?
                        </span>
                    </h2>
                    
                    <p className="text-neutral-400 text-lg mb-8 leading-relaxed max-w-lg">
                        This library is powered by <strong>The Walking Jumbo</strong>, a premium web development agency. 
                        We don't just sell components; we build award-winning digital experiences using this exact stack.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Hire The Walking Jumbo 
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-neutral-700 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                            View Portfolio
                        </button>
                    </div>
                </div>

                {/* Right Visual / "Jumbo" abstract representation */}
                <div className="relative h-full min-h-[300px] flex items-center justify-center">
                    {/* Abstract "Walking Jumbo" representation using UI cards */}
                    <div className="relative w-full max-w-sm aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl rotate-3 opacity-20 blur-xl"></div>
                        
                        {/* Front Card */}
                        <div className="absolute inset-4 bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-2xl flex flex-col justify-between -rotate-3 hover:rotate-0 transition-transform duration-500">
                           <div className="space-y-4">
                                <div className="h-8 w-8 rounded-full bg-indigo-500" />
                                <div className="h-4 w-2/3 bg-neutral-800 rounded" />
                                <div className="h-4 w-1/2 bg-neutral-800 rounded" />
                           </div>
                           <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                                <div className="flex items-center justify-between text-sm text-neutral-300">
                                    <span>Performance</span>
                                    <span className="text-green-400 font-mono">100%</span>
                                </div>
                                <div className="mt-2 h-1 w-full bg-neutral-700 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-green-500" />
                                </div>
                           </div>
                        </div>

                        {/* Floating Badge */}
                         <div className="absolute -top-4 -right-4 bg-neutral-800 border border-neutral-600 p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-white">Open for Projects</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
}