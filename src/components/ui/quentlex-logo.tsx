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
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    header: "w-10 h-10"
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
        <img 
          src="/assets/quentlex-logo.png"
          alt="Quentlex Logo"
          className={cn(
            "object-contain transition-all group-hover:scale-105",
            sizes[size],
            className
          )}
        />
        <div>
          <span className="text-xl font-bold text-foreground tracking-tight">Quentlex</span>
        </div>
      </Link>
    );
  }

  return (
    <img 
      src="/assets/quentlex-logo.png"
      alt="Quentlex Logo"
      className={cn(
        "object-contain",
        sizes[size],
        className
      )}
    />
  );
}