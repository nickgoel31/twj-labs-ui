"use client"

import React, { useState, useRef, useEffect, useContext, createContext, type ReactNode } from 'react';
import { cn } from '@/twj-lib/tw'; 
import type { Theme } from '@/twj-lib/types'; 
import { motion, AnimatePresence } from "motion/react";

// --- CONTEXT SETUP ---
interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeMenu: () => void;
  theme: Theme;
  align: 'left' | 'right';
  menuRef: React.RefObject<HTMLDivElement>;
  menuVariants: any; // Using 'any' for Framer Motion types simplification
  getTransition: () => any;
  themeClass: string;
}

// Create the context with initial dummy values
const DropdownMenuContext = createContext<DropdownContextType | undefined>(undefined);

// Custom hook to use the context
const useDropdownMenu = () => {
  const context = useContext(DropdownMenuContext);
  if (context === undefined) {
    throw new Error('Dropdown components must be used within <DropdownMenu>');
  }
  return context;
};

// --- CORE MENU COMPONENT ---

interface DropdownMenuProps {
  children: ReactNode; // Now accepts children instead of 'items'
  theme?: Theme;
  align?: 'left' | 'right';
}

export const DropdownMenu = ({ 
  children, 
  theme = "modern",
  align = "left" 
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeClass = `theme-${theme}`;

  // 1. Define Animation Variants based on state (Unchanged logic)
  const menuVariants = {
    hidden: { 
      opacity: 0, y: -8, 
      scale: theme === 'brutalist' ? 1 : 0.96,
      filter: theme === 'futuristic' ? "blur(4px)" : "blur(0px)"
    },
    visible: { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)"
    },
    exit: { 
      opacity: 0, y: -8, 
      scale: theme === 'brutalist' ? 1 : 0.96,
      filter: theme === 'futuristic' ? "blur(2px)" : "blur(0px)"
    }
  };

  // 2. Define Physics based on Theme (Unchanged logic)
  const getTransition = () => {
    switch (theme) {
      case 'playful':
        return { type: "spring", bounce: 0.5, duration: 0.4 };
      case 'brutalist':
        return { duration: 0.2, ease: "linear" };
      case 'futuristic':
        return { type: "spring", stiffness: 300, damping: 20 };
      case 'organic':
        return { duration: 0.4, ease: [0.22, 1, 0.36, 1] };
      default:
        return { duration: 0.2, ease: "easeOut" };
    }
  };

  const contextValue: DropdownContextType = {
    isOpen, setIsOpen, closeMenu, theme, align, menuRef, menuVariants, getTransition, themeClass
  };

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div 
        className={cn("relative inline-block text-left", themeClass)} 
        ref={menuRef}
      >
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

// --- SUB-COMPONENTS ---

interface DropdownMenuTriggerProps {
  children: ReactNode;
}

// Allows any element (like your Button) to act as the trigger
export const DropdownMenuTrigger = ({ children }: DropdownMenuTriggerProps) => {
  const { isOpen, setIsOpen } = useDropdownMenu();
  return React.cloneElement(children as React.ReactElement, {
    onClick: () => setIsOpen(!isOpen),
  });
};

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}

// The popover content wrapper
export const DropdownMenuContent = ({ children, className }: DropdownMenuContentProps) => {
  const { isOpen, align, menuVariants, getTransition, theme } = useDropdownMenu();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          transition={getTransition()}
          className={cn(
            // Base Layout
            "absolute z-50 mt-2 min-w-[200px] origin-top-right overflow-hidden",
            align === 'right' ? 'right-0' : 'left-0',
            
            // Thematic Variables
            "bg-surface text-foreground font-theme rounded-theme",
            
            // Default Borders/Shadows
            "border border-muted/20 shadow-lg",

            // Specific Theme Overrides
            theme === 'futuristic' && "border-primary/40 shadow-[0px_0px_20px_0px_var(--color-primary)] bg-background/90 backdrop-blur-md",
            theme === 'brutalist' && [
              "border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", "mt-1"
            ],
            theme === 'elegant' && "border-none shadow-xl ring-1 ring-black/5",
            className
          )}
        >
          <div className="py-1" role="menu">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

// The individual item component
export const DropdownMenuItem = ({ 
  children, 
  onClick, 
  disabled = false, 
  danger = false 
}: DropdownMenuItemProps) => {
  const { theme, closeMenu } = useDropdownMenu();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    closeMenu();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "group flex w-full items-center px-4 py-2.5 text-sm text-left transition-colors duration-150",
        "hover:bg-muted/30 focus:bg-muted/30 focus:outline-none",
        
        danger ? "text-red-500 hover:text-red-600 hover:bg-red-50" : "text-foreground",
        disabled && "opacity-50 cursor-not-allowed",

        theme === 'brutalist' && "hover:bg-primary hover:text-white hover:font-bold border-b border-transparent hover:border-black last:border-0",
        
        theme === 'futuristic' && "hover:bg-primary/20 hover:text-primary hover:shadow-[inset_2px_0_0_0_var(--color-primary)]",
      )}
      role="menuitem"
    >
      {children}
    </button>
  );
};