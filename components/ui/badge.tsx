import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "workflow";
  colorHex?: string; // For dynamic workflow coloring
  className?: string;
  style?: React.CSSProperties;
}

function Badge({ className, variant = "default", colorHex, style, ...props }: BadgeProps) {
  
  // Custom logic for "tinted" backgrounds based on workflow hex color
  const workflowStyle = colorHex ? {
    backgroundColor: `${colorHex}26`, // 15% opacity (approx hex 26)
    color: colorHex,
    borderColor: `${colorHex}4D`, // 30% opacity
    ...style
  } : style;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
            "border-transparent bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
            "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80": variant === "destructive",
            "text-foreground": variant === "outline",
            // Workflow variant relies on inline styles for dynamic backend colors
            "border": variant === "workflow", 
        },
        className
      )}
      style={variant === "workflow" ? workflowStyle : style}
      {...props}
    />
  );
}

export { Badge };