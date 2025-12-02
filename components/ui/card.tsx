import React from "react";
import type { Theme } from "@/twj-lib/types";
import { cn } from "@/twj-lib/tw";
import { fontApplier } from "@/twj-lib/font-applier";

// ----------------------------------------------------
// 🔵 Card Component (Main Wrapper)
// ----------------------------------------------------
interface CardProps {
  theme: Theme;
  children?: React.ReactNode;
}

export const Card = ({ theme, children }: CardProps) => {
    // 1. Determine the root theme class
      const themeClass = `theme-${theme}`;
      const fontClass = fontApplier(theme);
  // Allowed component types
  const allowed = ["CardHeader", "CardBody", "CardFooter"];

  // Validate and clone children with theme
  const validatedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // ensure the child is typed with an optional theme prop so we can inject it
    const element = child as React.ReactElement<{ theme?: Theme }>;

    const childName = (element.type as any).displayName;

    if (!allowed.includes(childName)) {
      console.warn(
        `❌ Invalid child <${childName}> passed to <Card>. Allowed children: CardHeader, CardBody, CardFooter.`
      );
      return null;
    }

    // inject theme into children
    return React.cloneElement(element, { theme });
  });

  return (
    <div data-theme={theme} className={cn(
    // Base Styles using the variables
        // font-theme maps to var(--font-family) set by the theme class
        // rouded-theme maps to var(--radius-theme) set by the theme class
        'rounded-theme font-semibold transition-all duration-200  w-[500px]',
        'focus:outline-none ',
    themeClass,
    fontClass,
    '',
    'border border-foreground/10 bg-surface dark:bg-surface-dark p-4',
     theme === 'brutalist' && [
            'text-foreground dark:text-foreground-dark dark:bg-background-dark uppercase tracking-wider border-2 border-foreground dark:border-foreground-dark',
           
            'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-foreground-dark',
            
        ],
    )}>
      {validatedChildren}
    </div>
  );
};

// ----------------------------------------------------
// 🟣 Card Header
// ----------------------------------------------------
interface CardHeaderProps {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
  theme?: Theme;
  className?: string;
}

export const CardHeader = ({ title, icon, description, theme, className }: CardHeaderProps) => {
  return (
    <div className={cn(
        'mb-4 flex flex-col items-start gap-2',
        theme === 'brutalist' && 'border-b-2 border-black pb-2',
        className
    )}>
      {icon && <div className={cn(
        'mb-2',
        theme === 'brutalist' && 'border-2 border-black p-1 bg-primary text-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      )}>{icon}</div>}
      {title && <h2 className={cn(
        'text-2xl font-bold ',
        
      )}>{title}</h2>}
      {description && <p className="text-foreground/80 dark:text-foreground-dark/80 mb-2">{description}</p>}
    </div>
  );
};
CardHeader.displayName = "CardHeader";

// ----------------------------------------------------
// 🟢 Card Body
// ----------------------------------------------------
interface CardBodyProps {
  children?: React.ReactNode;
  theme?: Theme;
  className?: string;
}

export const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={cn(
    className,
  )}>{children}</div>;
};
CardBody.displayName = "CardBody";

// ----------------------------------------------------
// 🟠 Card Footer
// ----------------------------------------------------
interface CardFooterProps {
  children?: React.ReactNode;
  theme?: Theme;
    className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return <div className={cn(
    className,
  )}>{children}</div>;
};
CardFooter.displayName = "CardFooter";
