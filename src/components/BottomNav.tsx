
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";

export function BottomNav() {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <nav className="container flex h-16 items-center justify-around px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 text-xs font-medium therapeutic-transition rounded-lg mx-1 touch-target icon-focus-ring",
              "hover:text-primary hover:bg-primary/5 focus:outline-none",
              location.pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground"
            )}
            style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
            aria-label={`Navigate to ${item.label}`}
          >
            <item.icon
              size="md"
              aria-hidden="true"
              focusable={false}
              withHover={true}
              withEntrance={true}
            />
            <span className="truncate">{item.mobileLabel || item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
