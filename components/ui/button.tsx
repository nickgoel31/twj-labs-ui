"use client"

import React from 'react';
import { cn } from '@/twj-lib/tw'; // Assuming you have your tailwind-merge helper
import { fontApplier } from '@/twj-lib/font-applier';
import type { Theme } from '@/twj-lib/types';
import { useTheme } from '@/contexts/ui-theme-context';


type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'ghost';
type ButtonSize = 'small' | 'default' | 'large' | 'icon';

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  theme?: Theme;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export const Button = ({ 
  label, 
  children,
  onClick, 
  theme, 
  variant = "primary", 
  size = "default",
  className,
  ...props
}: ButtonProps & React.ComponentProps<"button">) => {

  const {theme: contextTheme} = useTheme()
  const [localTheme] = React.useState<Theme>(theme || contextTheme || 'modern');
  
  
  // 1. Determine the root theme class
  const themeClass = `theme-${localTheme}`;
  const fontClass = fontApplier(localTheme);
  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        // Apply the theme class (which sets the variables)
        themeClass,
        fontClass,
        
        // Base Styles using the variables
        // font-theme maps to var(--font-family) set by the theme class
        // rouded-theme maps to var(--radius-theme) set by the theme class
        'rounded-theme font-semibold transition-all duration-200 cursor-pointer w-fit',
        'focus:outline-none ',
        
        // Sizing
        size === 'small' && 'text-sm py-2 px-4',
        size === 'default' && 'text-base py-2.5 px-6',
        size === 'large' && 'text-lg py-3 px-8',
        size === 'icon' && 'p-2 flex items-center justify-center aspect-square w-full max-w-10',

        // Variants
        variant === 'primary' && [
            'bg-primary text-white hover:bg-primary-dark',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            // Futuristic Glow override
            localTheme === 'futuristic' && 'shadow-[0px_0px_15px_0px_var(--color-primary)]',
            localTheme === 'brutalist' && 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]! bg-primary! text-background! hover:bg-primary/80!  ',
            localTheme === 'modern' && 'bg-gradient-to-r! from-[var(--color-gradient-one)]! to-[var(--color-gradient-three)]! text-white '
        ],
        
        variant === 'secondary' && [
            'bg-surface text-foreground border border-muted/20 hover:bg-muted/10',
            // Specific override for Brutalist
            localTheme === 'brutalist' && 'bg-gray-200 border-2 border-black'
        ],

        variant === 'outline' && 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
        
        variant === 'ghost' && 'bg-transparent text-foreground hover:bg-muted/20',

        // Brutalist Specific Hard Overrides (Shadows/Borders)
        localTheme === 'brutalist' && [
            'bg-background text-foreground   uppercase tracking-wider border-2 border-black',
            'hover:bg-primary hover:text-background',
            'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
            'active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
        ],

        className
      )}
    >
      {label}
      {children}
    </button>
  );
};