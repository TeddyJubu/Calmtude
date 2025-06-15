
import { Leaf } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <Leaf className="h-12 w-12 animate-gentle-pulse animate-wind-sway text-primary" />
      <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}

