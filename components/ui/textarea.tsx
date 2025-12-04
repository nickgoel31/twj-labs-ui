"use client"

import React, { useRef } from 'react'
import { cn } from '@/twj-lib/tw';
import { fontApplier } from '@/twj-lib/font-applier';
import type { Theme, TWJAIComponentsProps } from '@/twj-lib/types';
import { useTheme } from '@/contexts/ui-theme-context';
import { useAIControl } from '@/contexts/ai-context';

interface TextAreaProps extends TWJAIComponentsProps {
  theme?: Theme;
  className?: string;
}


const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ theme, className,aiID,aiDescription, ...props }, forwardedRef) => {
    
    const { theme: contextTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Internal ref
        const internalRef = useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    useAIControl({
      id: aiID || "",
      description: aiDescription || "",
      actions:{
        setValue: async (text: any) => {
           // ✅ FIX 2: Sanitize. If text is null/undefined, use empty string.
           // We also wrap in String() just in case the AI sends a number (like 123)
           const safeText = (text === undefined || text === null) ? "" : String(text);
           triggerChange(safeText);
        },
        clear: async () => {
           triggerChange("");
        }
      }
      
    })

     // THE MECHANIC
    const triggerChange = (newValue: string) => {
        const input = internalRef.current;
        if (!input) return;

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype, 
          "value"
        )?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, newValue);
        }

        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
    };

    const activeTheme = theme || contextTheme || "modern";
    const appliedTheme = mounted ? activeTheme : "modern";

    const fontClass = fontApplier(appliedTheme);
    const themeClass = `theme-${appliedTheme}`;

    return (
      <textarea
        // 3. IMPORTANT: Attach the ref here
        ref={(node) => {
                    internalRef.current = node;
                    if (typeof forwardedRef === 'function') {
                        forwardedRef(node);
                    } else if (forwardedRef) {
                        (forwardedRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
                    }
                }}
        {...props}
        className={cn(
          themeClass,
          fontClass,
          'rounded-theme border border-muted/30 bg-surface p-2 transition',
          'focus:outline-none focus:ring-2 focus:ring-primary/50',
          'text-foreground ',
          
          appliedTheme === 'brutalist' && [
            'bg-background text-foreground font-brutalist uppercase tracking-wider border-2 border-black',
            'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
          ],
          className
        )}
      />
    )
  }
);

TextArea.displayName = "TextArea";

export default TextArea