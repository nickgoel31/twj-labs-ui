"use client";

import React from "react";
import { cn } from "@/twj-lib/tw";
import { fontApplier } from "@/twj-lib/font-applier";
import type { TWJAIComponentsProps } from "@/twj-lib/types";
import { useTheme } from "@/contexts/ui-theme-context";
import { useAIControl } from "@/contexts/ai-context";

interface ColorPickerProps extends TWJAIComponentsProps {
  value?: string;
  onChange?: (color: string) => void;
  label?: string;
  className?: string;
}

export const ColorPicker = ({
  value = "#000000",
  onChange,
  label = "Pick Color",
  theme,
  className,
  aiID,
  aiDescription,
  ...props
}: ColorPickerProps & React.ComponentProps<"input">) => {
  const { theme: contextTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [color, setColor] = React.useState(value);

  // 🤖 AI Control
  if (aiID) {
    useAIControl({
      id: aiID,
      description: aiDescription || "Color picker input",
      actions: {
        setColor: async (newColor: string) => {
          setColor(newColor);
          onChange?.(newColor);
        },
        reset: async () => {
          setColor("#000000");
          onChange?.("#000000");
        }
      }
    });
  }

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = theme || contextTheme || "modern";
  const appliedTheme = mounted ? activeTheme : "modern";
  const fontClass = fontApplier(appliedTheme);
  const themeClass = `theme-${appliedTheme}`;

  return (
    <div
      className={cn(
        themeClass,
        fontClass,
        "flex items-center gap-3 w-fit"
      )}
    >
      {label && (
        <span className="text-sm font-medium text-foreground">
          {label}
        </span>
      )}

      <input
        type="color"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          onChange?.(e.target.value);
        }}
        className={cn(
          "h-10 w-10 cursor-pointer rounded-theme border transition-all",
          "bg-transparent p-0",
          "focus:outline-none focus:ring-2 focus:ring-primary",
          
          // Theme-specific tweaks
          appliedTheme === "futuristic" &&
            "shadow-[0px_0px_10px_var(--color-primary)]",
          appliedTheme === "brutalist" &&
            "border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
          appliedTheme === "modern" &&
            "border-muted/30",

          className
        )}
        {...props}
      />

      {/* Color Preview (Optional but 🔥) */}
      <div
        className="h-6 w-6 rounded-theme border"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};
