
import { Link, useLocation } from "react-router-dom";
import { Anchor, NotebookText, Waves, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Anchor },
  { href: "/emotion-log", label: "Log Emotion", icon: NotebookText },
  { href: "/grounding-tool", label: "Grounding", icon: Waves },
  { href: "/quick-stress-relief", label: "Quick Stress-Relief", icon: Zap },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                location.pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
