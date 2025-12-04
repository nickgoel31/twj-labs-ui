// components/theme-wrapper.tsx
import { cn } from "@/twj-lib/tw";

interface ThemeWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  themeName: string;
}

export function ThemeWrapper({ themeName, children, className, ...props }: ThemeWrapperProps) {
  return (
    <div
      data-theme={themeName}
      className={cn("transition-all duration-300 ease-in-out", className)}
      {...props}
    >
      {children}
    </div>
  );
}