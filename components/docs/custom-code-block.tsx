"use client"

import React, { useRef, useState, useEffect } from 'react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function CustomCodeBlock({ ref: _ref, ...props }: React.ComponentProps<'pre'>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Height threshold in pixels before "Show More" appears
  const MAX_HEIGHT = 300; 

  useEffect(() => {
    if (containerRef.current) {
      // Check if the scrollHeight is significantly larger than our max height
      if (containerRef.current.scrollHeight > MAX_HEIGHT) {
        setIsOverflowing(true);
      }
    }
  }, [props.children]);

  return (
    <CodeBlock {...props} className="my-4">
      <div 
        ref={containerRef}
        className={`relative transition-[max-height] duration-300 ease-in-out overflow-hidden ${
           !isExpanded && isOverflowing ? 'max-h-[300px]' : 'max-h-none'
        }`}
      >
        {/* We use the original Pre component from Fumadocs to keep 
           syntax highlighting and horizontal scrolling 
        */}
        <Pre>{props.children}</Pre>

        {/* Gradient Fade Overlay (Only visible when collapsed and overflowing) */}
        {!isExpanded && isOverflowing && (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Toggle Button */}
      {isOverflowing && (
        <div className="w-full flex justify-center border-t border-white/10 bg-neutral-900/30 p-2 rounded-b-lg">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-medium text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors px-3 py-1 rounded-full hover:bg-neutral-800"
            >
                {isExpanded ? (
                    <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                    <>Show More <ChevronDown className="w-3 h-3" /></>
                )}
            </button>
        </div>
      )}
    </CodeBlock>
  );
}