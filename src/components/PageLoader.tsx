
import { Leaf } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex-grow flex items-center justify-center">
      <Leaf className="h-12 w-12 animate-gentle-pulse text-primary" />
    </div>
  );
}
