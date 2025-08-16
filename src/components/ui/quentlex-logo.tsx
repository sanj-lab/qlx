import { cn } from "@/lib/utils";

interface QuentlexLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function QuentlexLogo({ className, size = "md" }: QuentlexLogoProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

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