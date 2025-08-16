import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface QuentlexLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "header";
  showText?: boolean;
}

export function QuentlexLogo({ className, size = "md", showText = true }: QuentlexLogoProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6",
    header: "w-8 h-8"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    header: "text-xl"
  };

  if (size === "header" && showText) {
    return (
      <Link to="/" className="flex items-center space-x-3 group">
        <div className={cn(
          "relative inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold shadow-sm group-hover:shadow-md transition-shadow",
          sizes[size],
          className
        )}>
          <span className="text-sm leading-none font-black">Q</span>
        </div>
        <div>
          <span className="text-xl font-bold text-foreground tracking-tight">Quentlex</span>
        </div>
      </Link>
    );
  }

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold",
      sizes[size],
      className
    )}>
      <span className="text-[0.6em] leading-none">Q</span>
    </div>
  );
}