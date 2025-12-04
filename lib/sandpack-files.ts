// lib/sandpack-files.ts

// 1. Tailwind Utils
export const TW_UTILS = `
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

// 2. Button Component
export const TWJ_BUTTON = `
import React from 'react';
import { cn } from './utils';

export const Button = ({ label, theme = 'modern', variant = 'primary', className, ...props }) => {
  const base = "px-5 py-2.5 font-bold transition-all duration-200 outline-none";
  
  const themes = {
    modern: "rounded-xl bg-zinc-900 text-white hover:bg-zinc-800",
    brutalist: "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 uppercase tracking-wider text-black",
    organic: "rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
  };

  return (
    <button className={cn(base, themes[theme], className)} {...props}>
      {label || props.children || "Button"}
    </button>
  );
};
`;

// 3. Input Component
export const TWJ_INPUT = `
import React from 'react';
import { cn } from './utils';

export const Input = ({ label, theme = 'modern', className, ...props }) => {
  const styles = {
    modern: "rounded-xl border border-zinc-200 bg-white focus:ring-2 ring-blue-500/20",
    brutalist: "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none font-mono placeholder:uppercase",
    organic: "rounded-full border border-emerald-200 bg-emerald-50/50 focus:border-emerald-500"
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-bold opacity-70">{label}</label>}
      <input 
        className={cn("w-full p-3 outline-none transition-all", styles[theme], className)} 
        {...props} 
      />
    </div>
  );
};
`;

// 4. Card Component
export const TWJ_CARD = `
import React from 'react';
import { cn } from './utils';

export const Card = ({ title, theme = 'modern', children, className }) => {
  const styles = {
    modern: "rounded-2xl border border-zinc-200 bg-white shadow-sm",
    brutalist: "bg-amber-100 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    organic: "rounded-[2rem] bg-stone-100 border-none"
  };

  return (
    <div className={cn("p-6 w-full max-w-sm", styles[theme], className)}>
      {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
};
`;