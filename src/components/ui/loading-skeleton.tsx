import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
}

export function LoadingSkeleton({ className, lines = 3, showAvatar = false }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="rounded-full bg-muted h-10 w-10"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardLoadingSkeleton() {
  return (
    <div className="enterprise-card p-6 animate-pulse">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-10 h-10 bg-muted rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-2/3"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-1/4"></div>
        <div className="h-3 bg-muted rounded w-1/3"></div>
      </div>
      <div className="mt-4 h-8 bg-muted rounded"></div>
    </div>
  );
}